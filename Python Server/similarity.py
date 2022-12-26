import spacy
  
nlp = spacy.load('en_core_web_md')
  

def get_similarity(keywords) -> int:
    tokens = nlp(keywords)
  
    token1, token2 = tokens[0], tokens[1]
  
    print("Similarity:", token1.similarity(token2))
    return token1.similarity(token2)