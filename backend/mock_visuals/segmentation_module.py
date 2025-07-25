import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

# Load data
df = pd.read_csv(r"C:\Users\hansi\Downloads\Nivritti AI\backend\models\segmentation_data.csv")

# Define features for clustering
features = ['total_spent', 'avg_cart_value', 'visits', 'days_since_last_visit',
            'loyalty_score', 'email_engagement_%']
X = df[features]

# Standardize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# KMeans clustering
kmeans = KMeans(n_clusters=4, random_state=42)
df['segment'] = kmeans.fit_predict(X_scaled)

# Show Segment Profiles
segment_profiles = df.groupby('segment')[features].mean().round(2)
print("\nSegment Profiles:\n", segment_profiles)

# Visualization setup
x_feature = 'avg_cart_value'
y_feature = 'total_spent'
segments = sorted(df['segment'].unique())

# Create 2x2 grid
fig, axes = plt.subplots(2, 2, figsize=(14, 8))
fig.suptitle("Customer Segments: Avg Cart Value vs Total Spent", fontsize=16)

for idx, segment in enumerate(segments):
    ax = axes[idx // 2][idx % 2]
    segment_data = df[df['segment'] == segment]
    
    sns.scatterplot(
        data=segment_data,
        x=x_feature,
        y=y_feature,
        ax=ax,
        color=sns.color_palette("Set1")[segment % 9],
        s=30,
        alpha=0.8
    )
    
    ax.set_title(f"Segment {segment}")
    ax.set_xlabel("Avg Cart Value")
    ax.set_ylabel("Total Spent")
    ax.grid(True)

plt.tight_layout(rect=[0, 0, 1, 0.95])
plt.show()
