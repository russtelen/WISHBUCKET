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
            <td>{itemData.name}</td>
            <td>{itemData.description}</td>
            <td><img src={itemData.imageURL} alt={itemData.name}></img></td>
            <td><a href={itemData.purchaseURL}>Purchase</a></td>
            <td>{formatPrice(itemData.price)}</td>
            <td>{itemData.isComplete ? '✔' : '❌'}</td>
        </tr>
    )
}

export default Item;
