import React, { useEffect, useState } from 'react';

// Create a Card component for better organization
function Card({ title, text, target, linkTitle, href, rel, onClick, linkClassName }) {
  return (
    <div className="card">
      <div className="card__title">{title}</div>
      <div className="card__text">{text}</div>
      <a
        className={`default-link card__link ${linkClassName}`}
        target={target}
        rel={rel}
        href={href}
        onClick={() => onClick(href)} // Pass the URL directly to the onClick function
      >
        {linkTitle}
      </a>
    </div>
  );
}

export default function Page() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() { // Create an async function for fetching data
      try {
        const response = await fetch('https://my-json-server.typicode.com/savayer/demo/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Map the data to a more structured format
        const newCards = data.map((item) => ({
          id: item.id,
          title: item.title,
          linkTitle: item.link_title,
          link: item.link,
          text: item.body.en.substr(0, 50) + '...',
        }));
        
        setCards(newCards);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData(); // Call the fetchData function
  }, []);

  function analyticsTrackClick(url) {
    // Sending clicked link URL to analytics
    console.log(url);
  }

  return (
    <div>
      {cards.map((item) => (
        <Card
          key={item.id} // Add a key prop to each Card component for better performance
          title={item.title}
          linkTitle={item.linkTitle}
          href={item.link}
          text={item.text}
          linkClassName={item.id === 1 ? 'card__link--red' : ''}
          target={item.id === 1 ? '_blank' : ''}
          onClick={analyticsTrackClick}
        />
      ))}
    </div>
  );
}
