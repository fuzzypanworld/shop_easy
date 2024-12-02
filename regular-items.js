document.addEventListener("DOMContentLoaded", () => {
                                            const regularItems = JSON.parse(localStorage.getItem("regularItems")) || [];
                                            const regularItemsList = document.getElementById("regularItems");
                                        
                                            function saveRegularItems() {
                                                localStorage.setItem("regularItems", JSON.stringify(regularItems));
                                            }
                                        
                                            function addRegularItem(name, quantity, imageSrc) {
                                                regularItems.push({ name, quantity, imageSrc, completed: false });
                                                saveRegularItems();
                                                renderRegularItems();
                                            }
                                        
                                            function renderRegularItems() {
                                                regularItemsList.innerHTML = "";
                                                regularItems.forEach((item, index) => {
                                                    const li = document.createElement("li");
                                                    li.className = item.completed ? "completed" : "";
                                                    li.innerHTML = `
                                                        <img src="${item.imageSrc}" alt="${item.name}" class="item-image">
                                                        <span>${item.name} - Quantity: ${item.quantity}</span>
                                                        <input type="checkbox" ${item.completed ? "checked" : ""} onchange="toggleComplete(${index})">
                                                        <button onclick="deleteItem(${index})">Delete</button>
                                                    `;
                                                    regularItemsList.appendChild(li);
                                                });
                                            }
                                        
                                            document.getElementById("regularItemForm").addEventListener("submit", (e) => {
                                                e.preventDefault();
                                                const itemName = document.getElementById("regularItemName").value.trim();
                                                const itemQuantity = document.getElementById("regularItemQuantity").value;
                                                const itemImage = document.getElementById("regularItemImage").files[0];
                                        
                                                if (itemImage) {
                                                    const reader = new FileReader();
                                                    reader.onload = () => {
                                                        addRegularItem(itemName, itemQuantity, reader.result);
                                                    };
                                                    reader.readAsDataURL(itemImage);
                                                } else {
                                                    addRegularItem(itemName, itemQuantity, "");
                                                }
                                        
                                                e.target.reset();
                                            });
                                        
                                            window.toggleComplete = function (index) {
                                                regularItems[index].completed = !regularItems[index].completed;
                                                saveRegularItems();
                                                renderRegularItems();
                                            };
                                        
                                            window.deleteItem = function (index) {
                                                regularItems.splice(index, 1);
                                                saveRegularItems();
                                                renderRegularItems();
                                            };
                                        
                                            // Save a flag in session storage to show popup when returning to default list
                                            document.querySelector("a[href='index.html']").addEventListener("click", () => {
                                                sessionStorage.setItem("fromRegularItems", "true");
                                            });
                                        
                                            renderRegularItems();
                                        });
                                        