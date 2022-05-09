import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const InventoryIdItem = () => {
    const {id} = useParams();
    const [phone, setPhone] = useState({});
    const [isReload, setIsReload] = useState(false);

    useEffect( () =>{
        const url = `http://localhost:5000/phones/${id}`;
        fetch(url)
        .then(res =>res.json())
        .then(data => setPhone(data));
    }, [id, isReload]);
    let {name,img,description,price,quantity,supplier} = phone;

    // update quantity
    const handleUpdateForm = e =>{
        e.preventDefault();
        let inputedQuantity = parseInt(e.target.quantity.value);
            quantity = parseInt(quantity) + inputedQuantity;

            const updatedPhoneQuantity = { quantity };

            const url = `http://localhost:5000/phones/${id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(updatedPhoneQuantity),
            })
            .then(res => res.json())
            .then(data =>{
                e.target.reset();
                setIsReload(!isReload)
            });
    };
    return (
        <>
        <h2 className='text-center pt-3'>Details About {name}</h2>
        <Card className='mx-auto my-5' style={{ width: '40rem' }}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {description}
                        <br />
                        <h6>Price: $ {price}</h6>
                        <h6>Quantity: {quantity}</h6>
                        <h6>Supplier Name: {supplier}</h6>
                    </Card.Text>
                <Button variant="success">Delivered</Button>
            </Card.Body>
        </Card>
        <form onSubmit={handleUpdateForm} className='login-form mx-auto w-25 my-3 py-5'>
            <input type="number" name='quantity' placeholder='Input Number To Update Quantity' required />
            <br />
            <br />
            <input type="submit" value="Update Quantity" />
        </form>
        </>
    );
};

export default InventoryIdItem;