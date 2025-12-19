import os

# Path to your dataset folder (relative to this script)
dataset_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dataset")

# Files you expect
files_to_check = [
    "dataset1.xlsx",
    "dataset2.xlsx"
]

# Check if dataset folder exists
if not os.path.exists(dataset_dir):
    print(f"Dataset folder NOT found at: {dataset_dir}")
else:
    print(f"Dataset folder found at: {dataset_dir}")

# Check each file
for file_name in files_to_check:
    file_path = os.path.join(dataset_dir, file_name)
    if os.path.exists(file_path):
        print(f"FOUND: {file_name}")
    else:
        print(f"MISSING: {file_name}")
