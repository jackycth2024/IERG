document.addEventListener('DOMContentLoaded', function() {

    checkLoginStatus();
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    changePasswordBtn.addEventListener('click', async function() {
        const currentPassword = prompt('Enter your current password:');
        if (!currentPassword) {
            return; // cancel the prompt
        }
        try {
            const userResponse = await fetch('/api/user');
            const user = await userResponse.json();
            const email = user.email;
            const checkPasswordResponse = await fetch('/api/checkpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password: currentPassword })
            });
            if (checkPasswordResponse.ok) {
                alert('Current Password is correct');
                const newPassword = prompt('Enter your new password:');
                const confirmNewPassword = prompt('Confirm your new password:');
                if (currentPassword === newPassword) {
                    alert('New password cannot be the same as the current password.');
                    return;
                }
                if (newPassword !== confirmNewPassword) {
                    alert('New password and confirm password do not match.');
                    return;
                }

                const changePasswordResponse = await fetch('/api/change-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ newPassword })
                });

                if (changePasswordResponse.ok) {
                    alert('Password changed successfully. Logging out...');
                    logout();
                    window.location.href = '/login.html';
                } else {
                    const errorMessage = await changePasswordResponse.text();
                    alert(`Error changing password: ${errorMessage}`);
                }
            } else {
                alert('Current Password is incorrect');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            alert('An error occurred while changing password. Please try again later.');
        }
    
    });

    function checkLoginStatus() {
        fetch('/api/user')
            .then(response => response.json())
            .then(user => {
                if (user.username) {
                    fetchOrders(user.username);
                    document.getElementById('changePasswordBtn').addEventListener('click', changePassword);
                } else {
                    window.location.href = '/login.html';
                }
            })
            .catch(error => {
                console.error('Error checking login status:', error);
            });
    }

    function fetchOrders(username) {
        fetch(`/api/orders/${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(orders => {
                const ordersTableBody = document.getElementById('MemberOrdersTableBody');
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

});


