import subprocess

dependencies = [
    "pymongo",                # MongoDB connector
    "scikit-learn",           # Machine learning utilities
    "pandas",                 # Data handling
    "numpy",                  # Numerical computing
    "fastapi",                # API framework
    "uvicorn",                # ASGI server
    "scipy",                  # Scientific computing
    "tqdm",                   # Progress bar
    "nltk",                   # Natural Language Processing
    "sentence-transformers",  # Pre-trained embeddings
    "torch",                  # PyTorch (for deep learning models)
    "joblib",                 # Model saving/loading
    "python-dotenv",          # Environment variable management
    "matplotlib",             # Data visualization
    "seaborn",                # Statistical data visualization
]

for package in dependencies:
    subprocess.run(["pip", "install", package])

print("All dependencies installed successfully!")
