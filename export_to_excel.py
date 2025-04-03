import json
import pandas as pd

def export_to_excel():
    with open("data.json", "r") as file:
        data = json.load(file)
    
    df = pd.DataFrame([data])
    df.to_excel("output.xlsx", index=False)

if __name__ == "__main__":
    export_to_excel()
