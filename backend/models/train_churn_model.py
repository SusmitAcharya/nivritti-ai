import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.tree import DecisionTreeClassifier
import pickle

# Load dataset
df = pd.read_csv("churn_data.csv")

# Drop identifier and raw dates (could be engineered into durations if needed)
df = df.drop(columns=["user_id", "signup_date", "last_login"])

# Encode 'used_coupon' if not already binary
if df["used_coupon"].dtype == "object":
    le = LabelEncoder()
    df["used_coupon"] = le.fit_transform(df["used_coupon"])

# Separate features and target
X = df.drop(columns=["churned"])
y = df["churned"]

# Feature scaling
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Train model
clf = DecisionTreeClassifier(random_state=42)
clf.fit(X_train, y_train)

# Save model
with open("churn_model.pkl", "wb") as f:
    pickle.dump(clf, f)

print("✅ Churn prediction model trained and saved as churn_model.pkl")
