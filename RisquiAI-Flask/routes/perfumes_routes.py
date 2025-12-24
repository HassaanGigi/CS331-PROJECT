from flask import Blueprint, jsonify, request, send_from_directory
import pandas as pd
import os
import subprocess
import threading

perfume_bp = Blueprint("perfume_bp", __name__)

# Path to dataset
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "dataset", "perfumes_combined.csv")

# Load dataset once
df = pd.read_csv(DATA_PATH)

@perfume_bp.route("/perfumes", methods=["GET"])
def get_perfumes():
    """
    Optional query parameters:
    - gender=men/women
    - min_price, max_price
    """
    filtered_df = df.copy()

    # Filter by gender
    gender = request.args.get("gender")
    if gender:
        filtered_df = filtered_df[filtered_df["gender"] == gender]

    # Filter by price
    min_price = request.args.get("min_price", type=float)
    max_price = request.args.get("max_price", type=float)
    if min_price is not None:
        filtered_df = filtered_df[filtered_df["price"] >= min_price]
    if max_price is not None:
        filtered_df = filtered_df[filtered_df["price"] <= max_price]

    # Return JSON
    return jsonify(filtered_df.to_dict(orient="records"))


# --------- New output-serving endpoints ---------
OUTPUTS_DIR = os.path.join(BASE_DIR, "Outputs")


def _read_output_csv(filename: str):
    path = os.path.join(OUTPUTS_DIR, filename)
    if not os.path.exists(path):
        return None
    return pd.read_csv(path)


@perfume_bp.route("/outputs/<name>", methods=["GET"])
def get_output_by_name(name: str):
    """Return JSON for named output CSVs (friendly names without extension).
    Example: /api/outputs/top_seller_perfumes
    """
    allowed = {
        "top_seller_perfumes": "top_seller_perfumes.csv",
        "scored_perfumes": "scored_perfumes.csv",
        "brand_performance": "brand_performance.csv",
        "brand_mapping": "brand_mapping.csv",
        "gender_mapping": "gender_mapping.csv",
        "itemLocation_mapping": "itemLocation_mapping.csv",
    }

    if name not in allowed:
        return jsonify({"error": "unknown output name"}), 404

    df_out = _read_output_csv(allowed[name])
    if df_out is None:
        return jsonify({"error": "file not found"}), 404

    # optional pagination
    page = request.args.get("page", default=1, type=int)
    per_page = request.args.get("per_page", default=200, type=int)
    if per_page > 1000:
        per_page = 1000

    start = (page - 1) * per_page
    end = start + per_page

    records = df_out.iloc[start:end].to_dict(orient="records")
    return jsonify({"page": page, "per_page": per_page, "count": len(records), "data": records})


@perfume_bp.route("/outputs/download/<filename>", methods=["GET"])
def download_output(filename: str):
    # security: allow only files that exist in Outputs
    if not os.path.exists(os.path.join(OUTPUTS_DIR, filename)):
        return jsonify({"error": "file not found"}), 404
    return send_from_directory(OUTPUTS_DIR, filename, as_attachment=True)


@perfume_bp.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "outputs_exist": os.path.exists(OUTPUTS_DIR)})


def _run_model_async():
    # run Model.py in background; outputs will be written to Outputs/
    try:
        subprocess.Popen(["python", "Model.py"], cwd=BASE_DIR)
    except Exception:
        pass


@perfume_bp.route("/outputs/refresh", methods=["POST"])
def refresh_outputs():
    """Trigger regeneration of outputs by running Model.py in background.
    This is asynchronous and returns immediately with 202.
    """
    thread = threading.Thread(target=_run_model_async, daemon=True)
    thread.start()
    return jsonify({"status": "started", "message": "Model run started in background"}), 202
