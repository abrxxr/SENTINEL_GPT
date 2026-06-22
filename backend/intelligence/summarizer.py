import re

class ExtractiveSummarizer:
    def summarize(self, text: str, max_sentences: int = 3) -> str:
        if not text or len(text.strip()) < 50:
            return text

        # Split into sentences
        sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', text)
        if len(sentences) <= max_sentences:
            return text

        # Score sentences based on key emergency indicators
        keywords = {"flood", "earthquake", "fire", "emergency", "evacuate", "disaster", "alert", "killed", "injured", "rescue", "water", "damage"}
        scores = []
        for i, sent in enumerate(sentences):
            score = 0
            words = set(re.findall(r'\b\w+\b', sent.lower()))
            score += len(words.intersection(keywords)) * 2
            
            # Position bias (first sentences are usually summarizing)
            if i == 0:
                score += 3
            elif i == 1:
                score += 1.5
                
            scores.append((score, i, sent))

        # Sort by score descending and grab the top sentences
        scores.sort(key=lambda x: x[0], reverse=True)
        top_sentences = scores[:max_sentences]
        
        # Sort sentences back by chronological index order
        top_sentences.sort(key=lambda x: x[1])
        
        return " ".join([item[2] for item in top_sentences])
