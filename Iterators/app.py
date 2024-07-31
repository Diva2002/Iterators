from flask import Flask, jsonify, request, send_from_directory
from alpha_vantage.fundamentaldata import FundamentalData
import os

app = Flask(__name__)

# Initialize the API key
api_key = '66XYLQPY8MM18IQH'
fundamental_data = FundamentalData(api_key)

def fetch_data(symbol):
    try:
        # Fetch company overview
        overview, _ = fundamental_data.get_company_overview(symbol)
        return overview
    except Exception as e:
        print(f"Error fetching data: {e}")
        return None

def compute_ratios(data):
    ratios = {}
    if data:
        # Basic ratios
        ratios['Return on Equity'] = float(data.get('ReturnOnEquityTTM', 0))
        ratios['Return on Capital Employed'] = float(data.get('ReturnOnCapitalEmployedTTM', 0))
        ratios['Operating Margins'] = float(data.get('OperatingMarginTTM', 0))
        ratios['Debt to Equity Ratio'] = float(data.get('DebtToEquityRatio', 0))
        ratios['Working Capital'] = float(data.get('WorkingCapital', 0))
        ratios['Return on Assets'] = float(data.get('ReturnOnAssetsTTM', 0))
        ratios['Net Interest Margins'] = float(data.get('NetInterestMargin', 0))
        ratios['Earnings Yield'] = float(data.get('EarningsYieldTTM', 0))
        ratios['Price to Earnings'] = float(data.get('PEGRatio', 0))
        ratios['Price to Book'] = float(data.get('PriceToBookRatio', 0))
        ratios['Free Cash Flow Yield'] = float(data.get('FreeCashFlowYield', 0))
        ratios['Dividend Yield'] = float(data.get('DividendYield', 0))
        ratios['Operating Revenue'] = float(data.get('RevenueTTM', 0))
        ratios['Operating Profit'] = float(data.get('OperatingIncomeTTM', 0))
        ratios['Profit After Tax'] = float(data.get('NetIncomeTTM', 0))
        ratios['Cash Flow from Operations'] = float(data.get('OperatingCashFlowTTM', 0))

        # Compute additional ratios if needed
        payout_ratio = float(data.get('PayoutRatio', 0))
        roe = ratios['Return on Equity']
        sgr = roe * (1 - payout_ratio)
        actual_advances_growth_rate = 0  # Replace with actual value if available
        ratios['SGR Gap'] = sgr - actual_advances_growth_rate

    return ratios

@app.route('/')
def home():
    return send_from_directory(os.getcwd(), 'index.html')

@app.route('/api/ratios', methods=['GET'])
def get_ratios():
    symbol = request.args.get('symbol')
    if not symbol:
        return jsonify({'error': 'No symbol provided'}), 400

    data = fetch_data(symbol)
    if not data:
        return jsonify({'error': 'Error fetching data'}), 500

    ratios = compute_ratios(data)
    return jsonify(ratios)

if __name__ == '__main__':
    app.run(debug=True)