import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor
from sklearn.metrics import mean_absolute_error
import joblib

# Load the data
df = pd.read_csv("forecast_model_data.csv")

# Convert date column
df['date'] = pd.to_datetime(df['date'], format='%d-%m-%Y')

# Extract time-based features
df['day'] = df['date'].dt.day
df['month'] = df['date'].dt.month
df['weekday'] = df['date'].dt.weekday
df['weekofyear'] = df['date'].dt.isocalendar().week.astype(int)

# Drop original date
df.drop(columns=['date'], inplace=True)

# Optional: Encode categorical features
categorical_cols = df.select_dtypes(include='object').columns
df = pd.get_dummies(df, columns=categorical_cols)

# Define X and y
target_col = 'sales' if 'sales' in df.columns else df.columns[-1]
X = df.drop(columns=[target_col])
y = df[target_col]

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

# Train XGBoost
model = XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42)
model.fit(X_train, y_train)

# Evaluate
preds = model.predict(X_test)
mae = mean_absolute_error(y_test, preds)
print(f"MAE on test set: {mae:.2f}")

# Save model
joblib.dump(model, "forecast_model.pkl")
print("Model saved as forecast_model.pkl")
