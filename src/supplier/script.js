
        // Navigation Functions
        function showSection(sectionName) {
            // Hide all sections
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show selected section
            document.getElementById(sectionName).classList.remove('hidden');            
            // Update sidebar active state
            const sidebarItems = document.querySelectorAll('.sidebar-item');
            sidebarItems.forEach(item => {
                item.classList.remove('bg-white', 'bg-opacity-50', 'border-l-4', 'border-pink-500');
                item.classList.add('hover:bg-white', 'hover:bg-opacity-30');
            });
            
            // Add active state to clicked item
            event.target.closest('.sidebar-item').classList.add('bg-white', 'bg-opacity-50', 'border-l-4', 'border-pink-500');
            event.target.closest('.sidebar-item').classList.remove('hover:bg-white', 'hover:bg-opacity-30');
        }

        const bellBtn = document.getElementById("bellBtn");
        const notifications = document.getElementById("notifications");

        let isOpen = false;

        // Toggle dropdown
        bellBtn.addEventListener("click", () => {
            notifications.classList.toggle("hidden");
            isOpen = !isOpen;
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
            if (!bellBtn.contains(e.target) && !notifications.contains(e.target)) {
                notifications.classList.add("hidden");
                isOpen = false;
            }
        });

        function toggleProfile() {
            const dropdown = document.getElementById('profileDropdown');
            dropdown.classList.toggle('hidden');
        }
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(event) {
            const profileDropdown = document.getElementById('profileDropdown');
            const profileButton = event.target.closest('button');
            
            if (!profileButton || !profileButton.onclick || profileButton.onclick.toString().indexOf('toggleProfile') === -1) {
                profileDropdown.classList.add('hidden');
            }
        });

        // Initialize Charts
        function initializeCharts() {
            // Orders Chart
            const ordersCtx = document.getElementById('ordersChart').getContext('2d');
            new Chart(ordersCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Orders',
                        data: [65, 78, 90, 81, 96, 105],
                        borderColor: '#ec4899',
                        backgroundColor: 'rgba(236, 72, 153, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(236, 72, 153, 0.1)'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(236, 72, 153, 0.1)'
                            }
                        }
                    }
                }
            });

            // Revenue Chart
            const revenueCtx = document.getElementById('revenueChart');
            if (revenueCtx) {
                new Chart(revenueCtx.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [{
                            label: 'Revenue',
                            data: [12000, 15000, 18000, 16000, 20000, 24000],
                            backgroundColor: 'rgba(236, 72, 153, 0.8)',
                            borderColor: '#ec4899',
                            borderWidth: 1,
                            borderRadius: 8
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: 'rgba(236, 72, 153, 0.1)'
                                }
                            },
                            x: {
                                grid: {
                                    color: 'rgba(236, 72, 153, 0.1)'
                                }
                            }
                        }
                    }
                });
            }
        }

        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initializeCharts();
            
            // Add staggered animation to cards
            const cards = document.querySelectorAll('.fade-in, .slide-in');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animationDelay = `${index * 0.1}s`;
                }, 100);
            });
        });

        // Add smooth scrolling and other interactive features
        // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        //     anchor.addEventListener('click', function (e) {
        //         e.preventDefault();
        //         const target = document.querySelector(this.getAttribute('href'));
        //         if (target) {
        //             target.scrollIntoView({
        //                 behavior: 'smooth'
        //             });
        //         }
        //     });
        // });


        //products
        // Sample product data
        let products = [
            { id: 1, name: "Wireless Headphones", sku: "WH-001", price: 89.99, stock: 45, category: "Electronics", status: "Active", image: "🎧" },
            { id: 2, name: "Cotton T-Shirt", sku: "CT-002", price: 24.99, stock: 120, category: "Clothing", status: "Active", image: "👕" },
            { id: 3, name: "Garden Hose", sku: "GH-003", price: 34.99, stock: 8, category: "Home", status: "Low Stock", image: "🌿" },
            { id: 4, name: "Running Shoes", sku: "RS-004", price: 129.99, stock: 67, category: "Sports", status: "Active", image: "👟" },
            { id: 5, name: "Smartphone Case", sku: "SC-005", price: 19.99, stock: 0, category: "Electronics", status: "Inactive", image: "📱" },
            { id: 6, name: "Yoga Mat", sku: "YM-006", price: 39.99, stock: 23, category: "Sports", status: "Active", image: "🧘" },
            { id: 7, name: "Coffee Maker", sku: "CM-007", price: 79.99, stock: 15, category: "Home", status: "Active", image: "☕" },
            { id: 8, name: "Denim Jeans", sku: "DJ-008", price: 59.99, stock: 89, category: "Clothing", status: "Active", image: "👖" }
        ];

        let currentPage = 1;
        let itemsPerPage = 10;
        let filteredProducts = [...products];

        function renderProducts() {
            const tbody = document.getElementById('productsTableBody');
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const pageProducts = filteredProducts.slice(startIndex, endIndex);

            tbody.innerHTML = pageProducts.map(product => `
                <tr class="table-row border-b border-pink-50">
                    <td class="px-6 py-4">
                        <div class="flex items-center space-x-3">
                            <div class="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center text-xl">
                                ${product.image}
                            </div>
                            <span class="font-medium text-gray-800">${product.name}</span>
                        </div>
                    </td>
                    <td class="px-6 py-4 text-gray-600">${product.sku}</td>
                    <td class="px-6 py-4 font-semibold text-gray-800">$${product.price}</td>
                    <td class="px-6 py-4">
                        <span class="px-3 py-1 rounded-full text-sm ${product.stock > 20 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}">
                            ${product.stock}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-gray-600">${product.category}</td>
                    <td class="px-6 py-4">
                        <span class="px-3 py-1 rounded-full text-sm ${product.status === 'Active' ? 'bg-green-100 text-green-800' : product.status === 'Low Stock' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}">
                            ${product.status}
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex items-center space-x-2">
                            <button onclick="editProduct(${product.id})" 
                                    class="btn-edit text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1 hover-lift">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                <span>Edit</span>
                            </button>
                            <button onclick="deleteProduct(${product.id})" 
                                    class="btn-delete text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1 hover-lift">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                                <span>Delete</span>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');

            updatePaginationInfo();
        }

        function updatePaginationInfo() {
            const startIndex = (currentPage - 1) * itemsPerPage + 1;
            const endIndex = Math.min(currentPage * itemsPerPage, filteredProducts.length);
            
            document.getElementById('showingStart').textContent = startIndex;
            document.getElementById('showingEnd').textContent = endIndex;
            document.getElementById('totalProducts').textContent = filteredProducts.length;
        }

        function filterProducts() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const categoryFilter = document.getElementById('categoryFilter').value;
            const statusFilter = document.getElementById('statusFilter').value;

            filteredProducts = products.filter(product => {
                const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                                    product.sku.toLowerCase().includes(searchTerm);
                const matchesCategory = !categoryFilter || product.category === categoryFilter;
                const matchesStatus = !statusFilter || product.status === statusFilter;

                return matchesSearch && matchesCategory && matchesStatus;
            });

            currentPage = 1;
            renderProducts();
        }

        function openModal(productId = null) {
            const modal = document.getElementById('productModal');
            const title = document.getElementById('modalTitle');
            
            if (productId) {
                title.textContent = 'Edit Product';
                // Load product data for editing
            } else {
                title.textContent = 'Add New Product';
                document.getElementById('productForm').reset();
            }
            
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeModal() {
            const modal = document.getElementById('productModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        function editProduct(id) {
            openModal(id);
        }

        function deleteProduct(id) {
            if (confirm('Are you sure you want to delete this product?')) {
                products = products.filter(p => p.id !== id);
                filterProducts();
            }
        }

        function previousPage() {
            if (currentPage > 1) {
                currentPage--;
                renderProducts();
            }
        }

        function nextPage() {
            const maxPages = Math.ceil(filteredProducts.length / itemsPerPage);
            if (currentPage < maxPages) {
                currentPage++;
                renderProducts();
            }
        }

        // Form submission
        document.getElementById('productForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('productName').value,
                sku: document.getElementById('productSKU').value,
                price: parseFloat(document.getElementById('productPrice').value),
                stock: parseInt(document.getElementById('productStock').value),
                category: document.getElementById('productCategory').value,
                description: document.getElementById('productDescription').value
            };

            // Add new product logic here
            console.log('Product saved:', formData);
            closeModal();
        });

        // Close modal when clicking outside
        document.getElementById('productModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Counter animation for stats
        function animateCounters() {
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 50;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 30);
            });
        }

        // Enhanced filter with loading animation
        function filterProducts() {
            const loader = document.getElementById('searchLoader');
            loader.classList.remove('hidden');
            
            setTimeout(() => {
                const searchTerm = document.getElementById('searchInput').value.toLowerCase();
                const categoryFilter = document.getElementById('categoryFilter').value;
                const statusFilter = document.getElementById('statusFilter').value;

                filteredProducts = products.filter(product => {
                    const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                                        product.sku.toLowerCase().includes(searchTerm);
                    const matchesCategory = !categoryFilter || product.category === categoryFilter;
                    const matchesStatus = !statusFilter || product.status === statusFilter;

                    return matchesSearch && matchesCategory && matchesStatus;
                });

                currentPage = 1;
                renderProducts();
                loader.classList.add('hidden');
            }, 300);
        }

        // Enhanced delete with confirmation modal
        function deleteProduct(id) {
            const product = products.find(p => p.id === id);
            if (confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
                // Add loading state to delete button
                const deleteBtn = event.target.closest('button');
                const originalContent = deleteBtn.innerHTML;
                deleteBtn.innerHTML = '<div class="loading-spinner mx-auto"></div>';
                deleteBtn.disabled = true;
                
                setTimeout(() => {
                    products = products.filter(p => p.id !== id);
                    filterProducts();
                    
                    // Show success notification
                    showNotification('Product deleted successfully!', 'success');
                }, 500);
            }
        }

        // Notification system
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium slide-up ${
                type === 'success' ? 'bg-green-500' : 
                type === 'error' ? 'bg-red-500' : 'bg-blue-500'
            }`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(-20px)';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        // Enhanced modal animations
        function openModal(productId = null) {
            const modal = document.getElementById('productModal');
            const title = document.getElementById('modalTitle');
            
            if (productId) {
                title.textContent = 'Edit Product';
                const product = products.find(p => p.id === productId);
                if (product) {
                    document.getElementById('productName').value = product.name;
                    document.getElementById('productSKU').value = product.sku;
                    document.getElementById('productPrice').value = product.price;
                    document.getElementById('productStock').value = product.stock;
                    document.getElementById('productCategory').value = product.category;
                }
            } else {
                title.textContent = 'Add New Product';
                document.getElementById('productForm').reset();
            }
            
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            // Animate modal content
            const modalContent = modal.querySelector('.bg-white');
            modalContent.style.transform = 'scale(0.9) translateY(20px)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modalContent.style.transform = 'scale(1) translateY(0)';
                modalContent.style.opacity = '1';
                modalContent.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 10);
        }

        function closeModal() {
            const modal = document.getElementById('productModal');
            const modalContent = modal.querySelector('.bg-white');
            
            modalContent.style.transform = 'scale(0.9) translateY(20px)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }, 300);
        }

        // Stagger animation for table rows
        function renderProducts() {
            const tbody = document.getElementById('productsTableBody');
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const pageProducts = filteredProducts.slice(startIndex, endIndex);

            tbody.innerHTML = pageProducts.map((product, index) => `
                <tr class="table-row border-b border-pink-50 stagger-animation" style="animation-delay: ${index * 0.05}s; transform: translateY(20px);">
                    <td class="px-6 py-4">
                        <div class="flex items-center space-x-3">
                            <div class="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center text-xl hover-lift">
                                ${product.image}
                            </div>
                            <span class="font-medium text-gray-800">${product.name}</span>
                        </div>
                    </td>
                    <td class="px-6 py-4 text-gray-600 font-mono">${product.sku}</td>
                    <td class="px-6 py-4 font-semibold text-gray-800">$${product.price}</td>
                    <td class="px-6 py-4">
                        <span class="px-3 py-1 rounded-full text-sm font-medium ${product.stock > 20 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}">
                            ${product.stock}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-gray-600">${product.category}</td>
                    <td class="px-6 py-4">
                        <span class="px-3 py-1 rounded-full text-sm font-medium ${product.status === 'Active' ? 'bg-green-100 text-green-800' : product.status === 'Low Stock' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}">
                            ${product.status}
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex items-center space-x-2">
                            <button onclick="editProduct(${product.id})" 
                                    class="btn-edit text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1 hover-lift">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                <span>Edit</span>
                            </button>
                            <button onclick="deleteProduct(${product.id})" 
                                    class="btn-delete text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1 hover-lift">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                                <span>Delete</span>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');

            updatePaginationInfo();
        }

        // Initialize the page
        setTimeout(() => {
            animateCounters();
        }, 500);
        renderProducts();


        // payment
        document.addEventListener('DOMContentLoaded', () => {
            
            // --- Staggered Fade-In Animation ---
            document.querySelectorAll('.fade-in').forEach((el, index) => {
                el.style.animationDelay = `${0.1 * index}s`;
            });


            // --- Payout Form Logic and Modal ---
            const form = document.getElementById('payout-form');
            const amountInput = document.getElementById('amount');
            const methodSelect = document.getElementById('method');
            const amountError = document.getElementById('amount-error');
            const modal = document.getElementById('confirmation-modal');
            const confirmAmountSpan = document.getElementById('confirm-amount');
            const confirmMethodSpan = document.getElementById('confirm-method');
            const cancelButton = document.getElementById('cancel-payout');
            const submitButton = document.getElementById('submit-payout');
            // The maximum available balance is hardcoded for simulation:
            const maxAvailable = 730000;

            // Function to open the modal
            function openModal() {
                modal.classList.remove('opacity-0', 'pointer-events-none');
                modal.querySelector('.shadow-2xl').classList.remove('scale-95');
            }

            // Function to close the modal
            function closeModal() {
                modal.classList.add('opacity-0', 'pointer-events-none');
                modal.querySelector('.shadow-2xl').classList.add('scale-95');
            }

            // Form Submission Handler (Opens Modal)
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const amount = parseFloat(amountInput.value);
                const methodText = methodSelect.options[methodSelect.selectedIndex].text;

                if (isNaN(amount) || amount < 1000 || amount > maxAvailable) {
                    amountError.classList.remove('hidden');
                    return;
                }
                amountError.classList.add('hidden');

                // Populate and open modal
                confirmAmountSpan.textContent = `₹ ${amount.toLocaleString('en-IN')}`;
                confirmMethodSpan.textContent = methodText;
                
                openModal();
            });

            // Cancel button handler
            cancelButton.addEventListener('click', closeModal);

            // Final Submit button handler
            submitButton.addEventListener('click', function() {
                const amount = parseFloat(amountInput.value);
                // Simulate API call and success
                alert(`SUCCESS! Payout of ₹${amount.toLocaleString('en-IN')} is being processed. Funds will reflect in 1-2 business days.`);
                
                // Close modal and reset form
                closeModal();
                form.reset();
            });

            // Close modal on outside click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // --- Counter Animation Simulation ---
            function animateValue(objId, start, end, duration) {
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    const currentValue = Math.floor(progress * (end - start) + start);
                    
                    const formattedValue = `₹ ${currentValue.toLocaleString('en-IN')}`;
                    document.getElementById(objId).textContent = formattedValue;

                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };
                window.requestAnimationFrame(step);
            }

            // Trigger counters on load
            animateValue("total-balance", 0, 850000, 2000);
            animateValue("pending-payments", 0, 120000, 2000);
            animateValue("available-balance", 0, 730000, 2000);

        });



         // Function to handle Stat Card clicks
        function showReportAlert(type) {
            alert(`Navigating to the '${type}' Report Page. You can view full detailed history and analytics here.`);
            // Production code would use: window.location.href = '/reports/' + type.toLowerCase();
        }

        // Function for Go to Settings button
        function goToSettings() {
            alert("Redirecting to the Settings page. You can modify Bank/KYC details here.");
            // Production code would use: window.location.href = '/dashboard/settings';
        }

        // Modal Logic
        const modal = document.getElementById('edit-modal');
        const openModalBtn = document.getElementById('open-edit-modal');
        const closeModalBtn = document.getElementById('close-modal');

        function openModal() {
            modal.classList.remove('opacity-0', 'pointer-events-none');
            modal.classList.add('modal-active'); // Add active class for transition
        }

        function closeModal() {
            modal.classList.add('opacity-0', 'pointer-events-none');
            modal.classList.remove('modal-active');
        }

        openModalBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);
        
        // Close modal when clicking outside (on the overlay)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });





        // ===== FAQ Toggle =====
function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector(".faq-icon");
    
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        icon.classList.remove("rotate-180");
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.classList.add("rotate-180");
    }
}

// ===== Chatbot Toggle =====
function toggleChatbot() {
    const chatWindow = document.getElementById("chatWindow");
    chatWindow.classList.toggle("hidden");
}



// ===== Quick Reply Buttons =====
function sendQuickReply(type) {
    let msg = "";
    if (type === "registration") msg = "How can I register as a supplier?";
    if (type === "payment") msg = "Tell me about payments.";
    if (type === "orders") msg = "I have a question about orders.";
    if (type === "shipping") msg = "How to track shipment?";

    addChatMessage("user", msg);
    botReply(type);
}

// ===== Chat Input Enter Key =====
function handleChatKeypress(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
}

// ===== Send Chat Message =====
function sendMessage() {
    const input = document.getElementById("chatInput");
    const msg = input.value.trim();
    if (!msg) return;

    addChatMessage("user", msg);
    input.value = "";

    // Simple bot reply logic
    botReply(msg.toLowerCase());
}

// ===== Add Chat Message to Window =====
function addChatMessage(sender, text) {
    const messages = document.getElementById("chatMessages");
    const msgDiv = document.createElement("div");
    msgDiv.className = "flex items-start space-x-2";
    
    const dotDiv = document.createElement("div");
    dotDiv.className = sender === "user" ? "w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0" : "w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0";
    
    const bubbleDiv = document.createElement("div");
    bubbleDiv.className = sender === "user" ? "bg-blue-50 rounded-lg p-3 max-w-xs self-end" : "bg-gray-100 rounded-lg p-3 max-w-xs";
    bubbleDiv.textContent = text;

    msgDiv.appendChild(dotDiv);
    msgDiv.appendChild(bubbleDiv);
    messages.appendChild(msgDiv);

    messages.scrollTop = messages.scrollHeight;
}

// ===== Bot Reply Logic =====
function botReply(query) {
    let reply = "Sorry, I didn’t understand. Please check FAQ or submit a support ticket.";
    if (query.includes("register")) reply = "📝 To register, go to Supplier Portal → Fill form → Upload documents → Wait for verification.";
    if (query.includes("payment")) reply = "💰 Payments are processed within 7-14 business days after delivery.";
    if (query.includes("orders")) reply = "📦 Manage orders from Dashboard → Active Orders → Update shipping and confirm delivery.";
    if (query.includes("shipping")) reply = "🚚 Shipments should include tracking numbers and be shipped within 2 business days.";

    setTimeout(() => addChatMessage("bot", reply), 800);
}

// ===== Support Ticket Form =====
function submitTicket(e) {
    e.preventDefault();
    alert("✅ Your support ticket has been submitted. Our team will contact you soon.");
    e.target.reset();
}

  