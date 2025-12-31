import { useState, useEffect } from 'react';
import { generateBingoCards, BingoCard } from '../utils/cardGenerator';
import '../styles/print.css';

function CardsView() {
  const [numCards, setNumCards] = useState(6);
  const [cardsPerPage, setCardsPerPage] = useState(2);
  const [cards, setCards] = useState<BingoCard[]>([]);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    // Generate initial cards
    regenerateCards();
  }, []);

  const regenerateCards = () => {
    const newCards = generateBingoCards(numCards);
    setCards(newCards);
  };

  const handlePrint = () => {
    setShowControls(false);
    setTimeout(() => {
      window.print();
      setTimeout(() => setShowControls(true), 100);
    }, 100);
  };

  const handleNumCardsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 100) {
      setNumCards(value);
    }
  };

  const handleCardsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCardsPerPage(parseInt(e.target.value));
  };

  // Group cards into pages
  const pages: BingoCard[][] = [];
  for (let i = 0; i < cards.length; i += cardsPerPage) {
    pages.push(cards.slice(i, i + cardsPerPage));
  }

  return (
    <div className="cards-view">
      {showControls && (
        <div className="controls no-print">
          <div className="controls-header">
            <h1>🎯 Bingo Card Generator</h1>
            <p>Generate random bingo cards for printing</p>
          </div>

          <div className="controls-section">
            <div className="control-group">
              <label htmlFor="numCards">
                Number of Cards:
                <input
                  id="numCards"
                  type="number"
                  min="1"
                  max="100"
                  value={numCards}
                  onChange={handleNumCardsChange}
                />
              </label>

              <label htmlFor="cardsPerPage">
                Cards per Page:
                <select
                  id="cardsPerPage"
                  value={cardsPerPage}
                  onChange={handleCardsPerPageChange}
                >
                  <option value="1">1 card</option>
                  <option value="2">2 cards</option>
                  <option value="4">4 cards</option>
                </select>
              </label>
            </div>

            <div className="button-group">
              <button className="btn btn-primary" onClick={regenerateCards}>
                🔄 Regenerate Cards
              </button>
              <button className="btn btn-success" onClick={handlePrint}>
                🖨️ Print Cards
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => (window.location.href = '/host')}
              >
                ← Back to Host
              </button>
            </div>
          </div>

          <div className="info-box">
            <p>
              <strong>Tip:</strong> Preview the cards below, then click "Print Cards" when ready.
              Adjust your printer settings to "Landscape" for best results with 2 or 4 cards per
              page.
            </p>
          </div>
        </div>
      )}

      {/* Print Preview / Actual Cards */}
      <div className="cards-container">
        {pages.map((pageCards, pageIndex) => (
          <div
            key={pageIndex}
            className={`page page-${cardsPerPage}`}
            style={{ pageBreakAfter: pageIndex < pages.length - 1 ? 'always' : 'auto' }}
          >
            {pageCards.map((card) => (
              <BingoCardComponent key={card.id} card={card} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

interface BingoCardComponentProps {
  card: BingoCard;
}

function BingoCardComponent({ card }: BingoCardComponentProps) {
  return (
    <div className="bingo-card">
      <div className="card-header">
        <h2>BINGO</h2>
        <div className="card-id">Card #{card.id}</div>
      </div>

      <div className="card-grid">
        {/* Column headers */}
        <div className="grid-header">
          <div className="header-cell header-b">B</div>
          <div className="header-cell header-i">I</div>
          <div className="header-cell header-n">N</div>
          <div className="header-cell header-g">G</div>
          <div className="header-cell header-o">O</div>
        </div>

        {/* Number grid */}
        <div className="grid-body">
          {card.numbers.map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={`grid-cell ${cell === 'FREE' ? 'free-space' : ''}`}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardsView;
