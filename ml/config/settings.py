# MongoDB connection settings
MONGODB_URI = "mongodb+srv://shauryajha35:shauryajha35@cluster0.ok6g962.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"  # Replace with your MongoDB connection string
DATABASE_NAME = "test" # Replace with your database name"

# Model parameters
CONTENT_BASED_WEIGHT = 0.5  # Weight for content-based recommendations in hybrid model
COLLABORATIVE_WEIGHT = 0.5  # Weight for collaborative recommendations in hybrid model

# Feature extraction settings
MAX_FEATURES = 1000  # Maximum number of features for TF-IDF
TOPICS_TO_EXTRACT = 10  # Number of topics for topic modeling

# Recommendation settings
TOP_N_RECOMMENDATIONS = 5  # Number of recommendations to generate per student
SIMILARITY_METRIC = "cosine"  # Similarity metric for content-based filtering

# Matrix factorization parameters
LATENT_FACTORS = 20  # Number of latent factors for matrix factorization
LEARNING_RATE = 0.01
REGULARIZATION = 0.1
MAX_ITERATIONS = 100