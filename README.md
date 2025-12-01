# 🧠 Nivritti AI

**Nivritti AI** is an AI-powered customer analytics and intelligence suite that simulates forecasting, churn prediction, and customer segmentation using structured datasets. It provides data-driven business insights through interpretable models and mock predictive visualizations, making it ideal for academic research, prototype presentations, or early-stage product demos.

---

## Project Structure

```
Nivritti AI/
├── backend/
│   ├── app.py                 
│   ├── models/
│   │   ├── forecast_model.pkl
│   │   ├── churn_model.pkl
│   │   ├── segmentation_model.pkl
│   │   ├── forecast_model_data.csv
│   │   ├── churn_data.csv
│   │   └── segmentation_data.csv
│   └── mock_visuals/
│       ├── forecast_module.py
│       ├── churn_module.py
│       ├── segmentation_module.py
│       ├── forecast_plot.png
│       ├── churn_plot.png
│       └── segmentation_plot.png
│   
├── frontend/
│   └── React/HTML templates  --> #Note:  A skeletal UI look, the data written are synthetic and not real SME data but the data is constructed by surveying 123 MSMEs in the Greater Kolkata Area.
│   
└── README.md
```

## 🚀 Modules Present

### 🔮 1. Forecast Module

Simulates and visualizes weekly average sales predictions with ±Simulates and visualizes weekly average sales predictions with \xb140% Gaussian noise.

```bash
python backend/mock_visuals/forecast_module.py
```

📜 **Output:**

- Weekly plot of actual vs predicted sales (`forecast_plot.png`)
- Uses `sales` and `date` columns for visualization

---

### 🔁 2. Churn Module

Simulates churn likelihoods using a logistic-like function and visualizes actual vs predicted churn probability.

```bash
python backend/mock_visuals/churn_module.py
```

📜 **Output:**

- Churn curve visualization (`churn_plot.png`)
- Inputs: `last_login`, `support_tickets`, `complaint_rate`, etc.

---

### 🧩 3. Segmentation Module

Clusters customers using KMeans and creates segment-wise scatter plots for comparative analysis.

```bash
python backend/mock_visuals/segmentation_module.py
```

📜 **Output:**

- 2x2 grid of scatter plots, each showing a separate segment's behavioral cluster (`segmentation_plot.png`)
- Printed **segment profile table**:

```
Segment Profiles:
segment    total_spent    avg_cart_value   visits  days_since_last_visit  loyalty_score   email_engagement_%
0          5172.07        344.30           15.15   43.03                  6.55            26.73
1          3354.39        277.99           12.14   61.45                  8.02            42.75
...
```

---

## 📌 Notes on Data & Models

- This project uses simulated data and mock predictions. Data is constructed by surveying 123 MSMEs in the Greater Kolkata Area. The outputs are **not 100% real-world accurate**, but useful for demonstration and testing.
- Clustering is done with KMeans; number of clusters set empirically (e.g., 4).
- Forecasts include Gaussian noise for realism.
- Churn probabilities are modeled with sigmoid approximation for demonstration only.

---

## 📈 Potential Applications

| Module       | Business Use Case                          |
| ------------ | ------------------------------------------ |
| Forecasting  | Sales planning, inventory optimization     |
| Churn Model  | Retention strategy, customer engagement    |
| Segmentation | Targeted marketing, loyalty program design |

---

## ✅ Summary of Key Features

- Forecast trends using mock time-series regression logic
- Churn likelihood estimation with simulated sigmoid mapping
- Segment customers using behavior data (KMeans clustering)
- High-quality matplotlib visualizations (300 DPI ready for reports)
- Segment profiling table for research integration
- Lightweight, self-contained, and extensible codebase

---

## Future Improvements

- Integrate actual ML models with real-world datasets
- Add a fully functional web frontend (React/Django templates)
- Support user uploads and interactive dashboards
- Backend APIs for visualization on-the-fly (FastAPI or Flask)

---

## Author

**Susmit Acharya**
Student AI Research Assistant, Class 12-B, Auxlium Convent School, Barasat.
**Soma Chakraborty (advisor)**
Assistant Teacher for Computer Applications and Computer Science, Auxlium Convent School, Barasat.

## License

This project is open for educational and non-commercial use. For commercial use, please contact the author.
