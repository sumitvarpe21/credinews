def analyze_text(text):
    suspicious_words = ['shocking', 'breaking', 'exposed', 'secret']
    score = 0
    for word in suspicious_words:
        if word in text.lower():
            score += 10
    return max(0, 100 - score)
