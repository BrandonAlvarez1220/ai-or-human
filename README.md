# AI Text Detector / Detector de Texto IA

> Classify text as **Human-written** or **AI-generated** using a Machine Learning model exposed via REST API and consumed by a React frontend.
>
> Clasifica texto como **escrito por humano** o **generado por IA** usando un modelo de Machine Learning expuesto via REST API y consumido por un frontend en React.

---

## 🧠 How it works / Cómo funciona

```
User inputs text
      ↓
React Frontend
      ↓
POST /predict  →  FastAPI
                      ↓
              TF-IDF Vectorizer
                      ↓
          Logistic Regression Model
                      ↓
     { label: "AI" | "Human", confidence: 97.3 }
                      ↓
         Result displayed in UI
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Model Training | Python, scikit-learn, TF-IDF, Logistic Regression |
| Dataset | [AI vs Human Text — Kaggle](https://www.kaggle.com/datasets/shanegerami/ai-vs-human-text) |
| Backend API | FastAPI, joblib, uvicorn |
| Frontend | React, TypeScript, Tailwind CSS, Axios |

---

## 📊 Model Performance / Rendimiento del Modelo

Trained on **487,000+ samples** from the Kaggle "AI vs Human Text" dataset.

| Metric | Human | AI |
|---|---|---|
| Precision | 1.00 | 1.00 |
| Recall | 1.00 | 1.00 |
| F1-Score | 1.00 | 1.00 |
| **Accuracy** | **99.7%** | |

> **Note / Nota:** The model performs best on formal or academic-style texts, which represent the training domain. Short or highly colloquial texts may produce less reliable predictions — a documented limitation and an area for future improvement with more diverse datasets.
>
> El modelo funciona mejor con textos formales o académicos, que representan el dominio del dataset de entrenamiento. Textos cortos o muy coloquiales pueden producir predicciones menos confiables — una limitación documentada y área de mejora futura con datasets más diversos.

---

## 🚀 Run Locally / Correr en local

### Prerequisites / Prerrequisitos

- Python 3.10+
- Node.js 18+

---

### Backend (FastAPI)

```bash
# Clone the repo / Clona el repo
git clone https://github.com/brandonalvarez/ai-or-human.git
cd ai-or-human/backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install dependencies / Instalar dependencias
pip install fastapi uvicorn scikit-learn joblib

# Run the server / Correr el servidor
uvicorn main:app --reload
```

API running at / API corriendo en: `http://localhost:8000`

---

### Frontend (React)

```bash
cd ../frontend

# Install dependencies / Instalar dependencias
npm install

# Run dev server / Correr servidor de desarrollo
npm run dev
```

Frontend running at / Frontend corriendo en: `http://localhost:5173`

---

### API Endpoint

```
POST /predict
Content-Type: application/json

{
  "text": "Your text here..."
}
```

**Response / Respuesta:**
```json
{
  "label": "AI",
  "confidence": 97.31
}
```

---

## 📁 Project Structure / Estructura del proyecto

```
ai-or-human/
├── backend/
│   ├── main.py
│   ├── models/
│   │   ├── model.pkl
│   │   └── vectorizer.pkl
│   └── venv/
└── frontend/
    ├── src/
    │   ├── App.tsx
    │   └── components/
    │       └── Result.tsx
    ├── index.html
    └── package.json
```

---

## 🔮 Future Improvements / Mejoras futuras

- [ ] Train with more diverse datasets (colloquial text, short messages)
- [ ] Add transformer-based model (BERT, RoBERTa) for better generalization
- [ ] Deploy API to Railway or Render for public demo
- [ ] Add text length warning for inputs under 200 characters
- [ ] Multilingual support

---

## 👤 Author / Autor

**Brandon Alvarez**
- GitHub: [github.com/brandonalvarez/ai-or-human](https://github.com/brandonalvarez/ai-or-human)

---

## 📄 License

MIT
