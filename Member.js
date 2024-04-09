document.addEventListener('DOMContentLoaded', function() {

    checkLoginStatus();
    
    function checkLoginStatus() {
        fetch('/api/user')
            .then(response => response.json())
            .then(user => {
                if (user.username) {
                    fetchOrders(user.username);
                    function fetchOrders(username) {
                        fetch(`/api/orders/${username}`)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.json();
                            })
                            .then(orders => {
                                console.log('Orders:', orders);
                                const ordersTableBody = document.getElementById('MemberordersContainer');
                                ordersTableBody.innerHTML = '';
                                orders.forEach(order => {
                                    const row = document.createElement('tr');
                                    row.innerHTML = `
                                        <td>${order.orderid}</td>
                                        <td>${order.payment_status}</td>
                                        <td>${order.orderdetails}</td>
                                    `;
                                ordersTableBody.appendChild(row);
                        });
                            })
                            .catch(error => console.error('Error fetching orders:', error));
                    }
                } else {
                    window.location.href = '/login.html';
                }
            })
            .catch(error => console.error('Error checking login status:', error));
    }
});
