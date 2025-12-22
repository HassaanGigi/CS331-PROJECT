# ===============================
# 1. Libraries
# ===============================
import pandas as pd
import numpy as np
import os

from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error

from xgboost import XGBRegressor

# ===============================
# 2. Load Dataset
# ===============================
DATA_PATH = "dataset/perfumes_combined.csv"

df = pd.read_csv(DATA_PATH)
print("Dataset loaded:", df.shape)

# ===============================
# 3. Keep Relevant Columns (include title)
# ===============================
required_columns = [
    "title",         # New: include perfume title
    "brand",
    "price",
    "itemLocation",
    "gender"
]

df = df[required_columns].dropna()
df = df[df["price"] > 0]

print("After cleaning:", df.shape)

# ===============================
# 4. Create Seller Quality Target (0–1)
# ===============================
def create_quality_target(df):
    df = df.copy()
    scaler = MinMaxScaler()

    # Normalize price
    df["price_norm"] = scaler.fit_transform(df[["price"]])

    # Brand popularity proxy
    brand_counts = df["brand"].value_counts()
    df["brand_score"] = df["brand"].map(brand_counts)
    df["brand_score"] = scaler.fit_transform(df[["brand_score"]])

    # Location reliability proxy
    location_counts = df["itemLocation"].value_counts()
    df["location_score"] = df["itemLocation"].map(location_counts)
    df["location_score"] = scaler.fit_transform(df[["location_score"]])

    # Final seller-focused score
    df["quality_score"] = (
        0.40 * (1 - df["price_norm"]) +   # price competitiveness
        0.35 * df["brand_score"] +        # brand demand
        0.25 * df["location_score"]       # logistics trust
    )

    return df

df = create_quality_target(df)

# ===============================
# 5. Encode Categorical Features (FOR MODEL ONLY)
# ===============================
features = [
    "price",
    "brand",
    "itemLocation",
    "gender"
]

target = "quality_score"

encoders = {}
for col in ["brand", "itemLocation", "gender"]:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    encoders[col] = le

X = df[features]
y = df[target]

# ===============================
# 6. Train-Test Split
# ===============================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ===============================
# 7. Train Random Forest Regressor
# ===============================
rf_model = RandomForestRegressor(
    n_estimators=300,
    max_depth=10,
    random_state=42
)
rf_model.fit(X_train, y_train)
rf_preds = rf_model.predict(X_test)
rf_rmse = np.sqrt(mean_squared_error(y_test, rf_preds))
print(f"Random Forest RMSE: {rf_rmse:.4f}")

# ===============================
# 8. Train XGBoost Regressor
# ===============================
xgb_model = XGBRegressor(
    n_estimators=400,
    learning_rate=0.05,
    max_depth=6,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)
xgb_model.fit(X_train, y_train)
xgb_preds = xgb_model.predict(X_test)
xgb_rmse = np.sqrt(mean_squared_error(y_test, xgb_preds))
print(f"XGBoost RMSE: {xgb_rmse:.4f}")

# ===============================
# 9. Compute Final Internal Score (0–1)
# ===============================
df["rf_score"] = rf_model.predict(X)
df["xgb_score"] = xgb_model.predict(X)
df["final_score"] = (df["rf_score"] + df["xgb_score"]) / 2

# ===============================
# 10. Save Categorical Mappings (for frontend decoding)
# ===============================
OUTPUT_DIR = "outputs"
os.makedirs(OUTPUT_DIR, exist_ok=True)

for col, le in encoders.items():
    mapping = pd.DataFrame({
        "code": le.transform(le.classes_),
        col: le.classes_
    })
    mapping.to_csv(f"{OUTPUT_DIR}/{col}_mapping.csv", index=False)

# ===============================
# 11. Prepare Frontend-Ready CSVs (title included)
# ===============================
df_export = df.copy()

# Decode categorical columns for frontend
for col, le in encoders.items():
    df_export[col] = le.inverse_transform(df_export[col])

# 1. Full scored dataset
df_export.to_csv(f"{OUTPUT_DIR}/scored_perfumes.csv", index=False)

# 2. Top 100 seller-friendly perfumes
top_perfumes = df_export.sort_values("final_score", ascending=False).head(100)
top_perfumes.to_csv(f"{OUTPUT_DIR}/top_seller_perfumes.csv", index=False)

# 3. Brand-level performance summary
brand_summary = df_export.groupby("brand")[["final_score"]].mean().reset_index()
brand_summary = brand_summary.sort_values("final_score", ascending=False)
brand_summary.to_csv(f"{OUTPUT_DIR}/brand_performance.csv", index=False)

print("Frontend-ready CSVs saved in 'outputs/' folder with titles included.")
