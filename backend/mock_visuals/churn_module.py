import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from scipy.special import expit  # for logistic/sigmoid curve

# Load data
df = pd.read_csv(r"../models/churn_data.csv")

# Set random seed for reproducibility
np.random.seed(42)

# Simulate actual churn based on satisfaction score (lower score = higher chance to churn)
# Inverse relation: score 1 → ~80% churn chance, score 5 → ~5% churn chance
churn_prob_actual = 1 - (df['satisfaction_score'] / 5)
df['churned'] = (np.random.rand(len(df)) < churn_prob_actual).astype(int)

# Simulate predicted churn probabilities using logistic model (expit = 1 / (1 + e^-x))
# Smoother, more believable prediction curve
df['predicted_churn_prob'] = expit(5 - 2 * df['satisfaction_score'])

# Bin satisfaction scores (rounded to nearest 0.5)
df['score_bin'] = df['satisfaction_score'].round(1)

# Calculate averages per bin
binned = df.groupby('score_bin').agg({
    'churned': 'mean',
    'predicted_churn_prob': 'mean'
}).reset_index()

# Plot
plt.figure(figsize=(14, 6))
plt.plot(binned['score_bin'], binned['churned'], label='Actual Churn Rate', marker='o', linewidth=2)
plt.plot(binned['score_bin'], binned['predicted_churn_prob'], label='Predicted Churn Probability',
         linestyle='--', marker='x', color='red', linewidth=2)

plt.title('Avg. Actual vs Predicted Churn Probability by Satisfaction Score')
plt.xlabel('Satisfaction Score (Binned)')
plt.ylabel('Churn Rate / Probability')
plt.grid(True)
plt.legend()
plt.tight_layout()
plt.show()
