import pandas as pd
import os

# ---- 1. Paths ----
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
dataset_dir = os.path.join(BASE_DIR, "dataset")

# New filenames
men_file = os.path.join(dataset_dir, "dataset1.xlsx")  # men
women_file = os.path.join(dataset_dir, "dataset2.xlsx")  # women
output_file = os.path.join(dataset_dir, "perfumes_combined.csv")


men_df = pd.read_excel(men_file)
women_df = pd.read_excel(women_file)


men_df["gender"] = "men"
women_df["gender"] = "women"


df = pd.concat([men_df, women_df], ignore_index=True)


print("Shape of merged dataset:", df.shape)
print("Missing values per column:\n", df.isnull().sum())
print("Sample rows:\n", df.head())


df.to_csv(output_file, index=False)
print(f"Merged dataset saved to: {output_file}")
