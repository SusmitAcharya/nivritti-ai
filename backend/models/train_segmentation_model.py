import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
import joblib

# Load the data
df = pd.read_csv("segmentation_data.csv")

# Drop identifier and non-numeric fields
df = df.drop(columns=["customer_id", "join_date"])

# One-hot encode categorical features
df_encoded = pd.get_dummies(df, columns=["category_preference", "preferred_payment_method"], drop_first=True)

# Standardize numerical features
scaler = StandardScaler()
scaled_features = scaler.fit_transform(df_encoded)

# Train KMeans model
kmeans = KMeans(n_clusters=4, random_state=42)
kmeans.fit(scaled_features)

# Save model and scaler
joblib.dump(kmeans, "segmentation_model.pkl")
joblib.dump(scaler, "segmentation_scaler.pkl")

print("✅ Segmentation model and scaler saved.")
