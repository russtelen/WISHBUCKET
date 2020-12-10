import React from 'react';

const Item = (props) => {
    const itemData = props.item;

    const formatPrice = (price) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })

        return formatter.format(price);
    }

    return (
        <tr>
            <td>{itemData.Name}</td>
            <td>{itemData.Description}</td>
            <td><img src={itemData.ImageURL} alt={itemData.Name}></img></td>
            <td><a href={itemData.PurchaseURL}>Purchase</a></td>
            <td>{formatPrice(itemData.Price)}</td>
            <td>{itemData.isComplete ? '✔' : '❌'}</td>
        </tr>
    )
}

export default Item;