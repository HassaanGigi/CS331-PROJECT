import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import DBSCAN

# --- Data Setup ---
points = np.array([
    [3, 7], [4, 6], [5, 5], [6, 4], [7, 3], [6, 2],
    [7, 2], [8, 4], [3, 3], [2, 6], [3, 5], [2, 4]
])
labels_pts = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12']

# --- DBSCAN Parameters ---
epsilon = 1.9
min_pts = 4

# Running the model
model = DBSCAN(eps=epsilon, min_samples=min_pts).fit(points)
cluster_labels = model.labels_

# --- IDENTIFY POINT TYPES ---
# We find which indices belong to 'Core' samples
core_indices = model.core_sample_indices_

# ---VISUALIZATION ---
plt.figure(figsize=(9, 7))
# Loop through each point to plot them individually based on their type
for i in range(len(points)):
    x, y = points[i]
    
    # 1. Check if it is Noise
    if cluster_labels[i] == -1:
        plt.scatter(x, y, color='black', marker='x', s=100, label='Noise' if i == 8 else "")
    # 2. Check if it is a Core Point
    elif i in core_indices:
        plt.scatter(x, y, color='royalblue', marker='o', s=150, edgecolors='black', label='Core' if i == 1 else "")   
    # 3. Otherwise, it must be a Border Point
    else:
        plt.scatter(x, y, color='cyan', marker='o', s=60, edgecolors='black', label='Border' if i == 0 else "")

    # Add the Point Label (P1, P2...) next to the dot
    plt.text(x + 0.1, y + 0.1, labels_pts[i], fontsize=10)

plt.title(f"DBSCAN Results (Eps={epsilon}, MinPts={min_pts})")
plt.xlabel("X-Axis")
plt.ylabel("Y-Axis")
plt.grid(True, alpha=0.3)
plt.legend(loc='upper right')
plt.show()

# --- OUTPUT RESULTS ---
print("DBSCAN Cluster Assignments:")
for i in range(len(labels_pts)):
    print(f"{labels_pts[i]}: {cluster_labels[i]}")
