import React, { useState, useEffect } from 'react';
import { itemData } from '../data';

const ItemsDisplay = ({ searchQuery }) => {
  const [displayItem, setDisplayItem] = useState(itemData);

  useEffect(() => {
    const lowerSearch = searchQuery.toLowerCase();

    const filtered = itemData.filter(item => {
      const fileName = item.item_img.split('/').pop().replace('.jpg', '');
      return fileName.toLowerCase().includes(lowerSearch);
    });

    setDisplayItem(filtered);
  }, [searchQuery]);

  return (
    <div className="itemSection">
      {displayItem.length > 0 ? (
        displayItem.map((item, index) => {
          const name = item.item_img.split('/').pop().replace('.jpg', '');
          return (
            <div className="gallery" key={index}>
              <img src={item.item_img} alt={name} />
              {/* <h4>{name}</h4> */}
            </div>
          );
        })
      ) : (
        <p style={{ textAlign: "center", color: "gray" }}>
          No matching items found.
        </p>
      )}
    </div>
  );
};

export default ItemsDisplay;
