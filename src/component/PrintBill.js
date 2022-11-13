import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PrintBill() {

    const cartData = useSelector(state => state.cart)
    const navigate = useNavigate();
    console.log('cart', cartData)
    var pAmount = 0

    const user = window.localStorage.getItem('Login');
    const userdata = JSON.parse(user)[0]
    console.log(userdata);
    const generateBill = () => {
        window.print()
        window.localStorage.removeItem('Cart')
        window.localStorage.removeItem('TotalAmount')
        // window.location.reload();
        navigate('/')
    }

    return (
        <div id="bill" className='bg-light text-dark'>
            <div className='container'>
                <div className='row'>
                    <div className='text-dark font-weight-bold rounded col-4 h1'><img src='../images/logo.png' height="50px" width="50px" /> Sunglasses</div>
                </div>
            </div>
            <div className='container d-flex justify-content-end'>
                <div className='h6'>
                    <div className='ms-0'>
                        Date : {new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear()} <br />
                        Time : {new Date().getHours() + ' : ' + new Date().getMinutes() + ' : ' + new Date().getSeconds()}
                    </div>
                </div>
            </div>
            <div className='container d-flex justify-content-start '>
                <div className='row'>
                    <div className='row h6'>
                        <div className='col-6'>
                            Customer Name :
                        </div>
                        <div className='col-6'>
                            {userdata.name}
                        </div>
                    </div>
                    <div className='row h6'>
                        <div className='col-6'>
                            Customer ID :
                        </div>
                        <div className='col-6'>
                            {userdata.id}
                        </div>
                    </div>
                    <div className='row h6'>
                        <div className='col-6'>
                            Customer Email ID :
                        </div>
                        <div className='col-6'>
                            {userdata.email}
                        </div>
                    </div>
                </div>


            </div>
            <div className='cart bg-white text-dark border border-dark'>
                <div className='container'>
                    <div className='row pt-5 pb-2 head-row h3'>
                        <div className='col-2'>Index</div>
                        <div className='col-3'>Name</div>
                        <div className='col-2'>Price</div>
                        <div className='col-2'>Quantity</div>
                        <div className='col-3'>Total Price</div>
                    </div>
                    {
                        cartData.map((item, index) => {
                            let p1 = parseInt(item.price - (0.15 * item.price))
                            // console.log(item.quantity * item.price)
                            let total = p1 * Number(item.quantity)
                            pAmount = pAmount + total
                            return (
                                <div className='row p-2 content-row h5' key={index}>
                                    <div className='col-2'>{index + 1}</div>
                                    <div className='col-3'>{item.name}</div>
                                    <div className='col-2'>{p1}</div>
                                    <div className='col-2'>{item.quantity}</div>
                                    <div className='col-3'>{total}</div>
                                </div>
                            )
                        })
                    }
                    <div className='row h5 pb-3 btm-row h4'>
                        <div className='col-9'>Total Amount : </div>
                        <div className='col-3'>{pAmount}
                        </div>
                    </div>
                </div>
            </div>

            <div className='container h5'>
                Thank You For Shopping
            </div>

            <div className='container'>
                <button className='bg-primary text-white' onClick={generateBill}>Print</button>
            </div>

        </div>
    )
}

export default PrintBill