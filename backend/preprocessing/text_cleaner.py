import re

class TextCleaner:
    def __init__(self):
        # Basic patterns
        self.url_pattern = re.compile(r'https?://\S+|www\.\S+')
        self.emoji_pattern = re.compile(r'[^\x00-\x7F]+') # Basic emoji/unicode remover

    def clean(self, text: str) -> str:
        if not text:
            return ""
        # 1. Lowercase
        cleaned = text.lower()
        # 2. Remove URLs
        cleaned = self.url_pattern.sub('', cleaned)
        # 3. Remove non-ascii characters (emojis/unusual symbols)
        cleaned = self.emoji_pattern.sub('', cleaned)
        # 4. Remove excessive whitespaces
        cleaned = re.sub(r'\s+', ' ', cleaned).strip()
        return cleaned

    def extract_keywords(self, text: str):
        cleaned = self.clean(text)
        # Simple tokenization without nltk dependency just in case it's not setup yet
        tokens = re.findall(r'\b\w+\b', cleaned)
        # Filter stopwords
        stopwords = {"the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "with", "is", "are", "was", "were", "of", "about"}
        return [t for t in tokens if t not in stopwords]
