from flask import Blueprint, jsonify, request
import pandas as pd
import os

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
