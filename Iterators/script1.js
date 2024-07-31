document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');

    questions.forEach(question => {
        const radios = question.querySelectorAll('input[type="radio"]');
        const explanation = question.querySelector('.explanation');
        const correctAnswer = question.dataset.correct;

        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === correctAnswer) {
                    explanation.innerHTML = "<strong>Correct!</strong> " + getExplanation(question.id, correctAnswer);
                    explanation.classList.remove('incorrect');
                    explanation.classList.add('correct');
                } else {
                    explanation.innerHTML = "<strong>Incorrect!</strong> " + getExplanation(question.id, correctAnswer);
                    explanation.classList.remove('correct');
                    explanation.classList.add('incorrect');
                }
                explanation.style.display = 'block';
            });
        });
    });

    document.querySelectorAll('.sidebar nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

function getExplanation(questionId, correctAnswer) {
    const explanations = {
        question1: {
            A: "A stock is a share in the ownership of a company. When you own a stock, you own a part of the company. This ownership entitles you to a portion of the company's assets and earnings. Stocks are also referred to as equities because they represent equity ownership in a company. Shareholders can benefit from the company's growth and profitability through dividends and appreciation in the stock's price. Stocks are traded on stock exchanges, allowing investors to buy and sell shares of publicly traded companies."
        },
        question2: {
            B: "ETF stands for Exchange-Traded Fund. An ETF is a type of investment fund that holds a collection of assets, such as stocks, bonds, or other securities, and is traded on stock exchanges, much like individual stocks. ETFs offer investors a way to diversify their portfolios by investing in a broad range of assets with a single purchase. They are known for their flexibility, cost-efficiency, and liquidity."
        },
        question3: {
            C: "Equity represents ownership interest in a company. It represents the value that would be returned to shareholders if all the assets of a company were liquidated and all its debts repaid. Equity can take the form of stock ownership in a corporation, which gives shareholders voting rights and a claim on the company's profits through dividends and capital gains. Equity is an essential concept in finance and accounting, reflecting the residual interest in the assets of an entity after deducting liabilities."
        },
        question4: {
            B: "A dividend is a portion of a company's earnings paid to shareholders. Dividends are typically distributed in the form of cash payments or additional shares of stock and are usually paid out on a regular basis (e.g., quarterly). Companies may choose to pay dividends as a way to share profits with their shareholders, providing them with a return on their investment. The amount and frequency of dividends are determined by the company's board of directors."
        },
        question5: {
            D: "Market capitalization is the total value of a company's outstanding shares. It is calculated by multiplying the current share price by the total number of outstanding shares. Market capitalization (often referred to as 'market cap') is used to measure a company's size and provides investors with a quick way to gauge its value relative to others. For example, a company with 1 million shares outstanding at a price of $50 per share would have a market capitalization of $50 million."
        },
        question6: {
            A: "P/E ratio stands for Price-to-Earnings ratio. The P/E ratio is a financial metric used to evaluate the valuation of a company by comparing its current share price to its earnings per share (EPS). It is calculated by dividing the market value per share by the earnings per share. This ratio helps investors determine if a stock is overvalued, undervalued, or fairly valued compared to its earnings. A high P/E ratio might indicate that a stock is overvalued, while a low P/E ratio might suggest it is undervalued."
        },
        question7: {
            B: "A bull market is a market in which prices are rising. In a bull market, the prices of securities are generally increasing, often accompanied by widespread investor optimism and confidence. This upward trend can be seen in various markets, including stocks, real estate, and commodities. Bull markets can last for months or even years, and they typically occur during periods of strong economic growth and positive investor sentiment."
        },
        question8: {
            C: "Diversification means spreading investments across different assets. The goal of diversification is to reduce risk by allocating investments among various financial instruments, industries, and other categories. This strategy helps protect a portfolio against significant losses, as the performance of different assets can vary. By diversifying, an investor can potentially achieve more stable returns over time."
        }
    };

    return explanations[questionId][correctAnswer];
}
