import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Load data
df = pd.read_csv(r"../models/forecast_model_data.csv")


# Convert date column to datetime
df['date'] = pd.to_datetime(df['date'], dayfirst=True)
df.set_index('date', inplace=True)

# Create realistic dummy predictions with ±10% Gaussian noise
np.random.seed(42)  # For reproducibility
noise = np.random.normal(0, 0.4, size=len(df))  # ±10% noise
df['predicted_sales'] = df['sales'] * (1 + noise)

# Keep only numeric columns for resampling
numeric_cols = ['sales', 'predicted_sales']
weekly_df = df[numeric_cols].resample('W').mean().reset_index()

# Plot
plt.figure(figsize=(14, 6))
plt.plot(weekly_df['date'], weekly_df['sales'], label='Actual Sales (Weekly Avg)', linewidth=2)
plt.plot(weekly_df['date'], weekly_df['predicted_sales'], label='Predicted Sales (Weekly Avg)', linestyle='--', color='orange')
plt.title('Weekly Avg: Actual vs Predicted Sales (Simulated)')
plt.xlabel('Date')
plt.ylabel('Sales')
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()
