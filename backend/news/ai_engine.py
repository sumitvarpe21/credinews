import re

SUSPICIOUS_WORDS = [
    "breaking", "shocking", "exposed", "secret",
    "you won't believe", "truth revealed", "viral"
]

def analyze_text(text):
    """
    Returns AI credibility score (0–100)
    """
    penalty = 0
    text = text.lower()

    # Rule 1: Sensational words
    for word in SUSPICIOUS_WORDS:
        if word in text:
            penalty += 10

    # Rule 2: Excessive punctuation
    if text.count("!") > 3:
        penalty += 10

    # Rule 3: ALL CAPS words
    caps_words = re.findall(r'\b[A-Z]{3,}\b', text)
    if len(caps_words) > 2:
        penalty += 10

    ai_score = max(0, 100 - penalty)
    return ai_score
