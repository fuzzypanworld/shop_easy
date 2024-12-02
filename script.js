document.addEventListener("DOMContentLoaded", () => {
                                            const defaultItems = JSON.parse(localStorage.getItem("defaultItems")) || [];
                                            const defaultItemsList = document.getElementById("defaultItems");
                                            const popup = document.getElementById("popup");
                                        
                                            function saveDefaultItems() {
                                                localStorage.setItem("defaultItems", JSON.stringify(defaultItems));
                                            }
                                        
                                            function addDefaultItem(name, quantity, imageSrc) {
                                                defaultItems.push({ name, quantity, imageSrc, completed: false });
                                                saveDefaultItems();
                                                renderDefaultItems();
                                            }
                                        
                                            function renderDefaultItems() {
                                                defaultItemsList.innerHTML = "";
                                                defaultItems.forEach((item, index) => {
                                                    const li = document.createElement("li");
                                                    li.className = item.completed ? "completed" : "";
                                                    li.innerHTML = `
                                                        <img src="${item.imageSrc}" alt="${item.name}" class="item-image">
                                                        <span>${item.name} - Quantity: ${item.quantity}</span>
                                                        <input type="checkbox" ${item.completed ? "checked" : ""} onchange="toggleComplete(${index})">
                                                        <button onclick="deleteItem(${index})">Delete</button>
                                                    `;
                                                    defaultItemsList.appendChild(li);
                                                });
                                            }
                                        
                                            document.getElementById("itemForm").addEventListener("submit", (e) => {
                                                e.preventDefault();
                                                const itemName = document.getElementById("itemName").value.trim();
                                                const itemQuantity = document.getElementById("itemQuantity").value;
                                                const itemImage = document.getElementById("itemImage").files[0];
                                        
                                                if (itemImage) {
                                                    const reader = new FileReader();
                                                    reader.onload = () => {
                                                        addDefaultItem(itemName, itemQuantity, reader.result);
                                                    };
                                                    reader.readAsDataURL(itemImage);
                                                } else {
                                                    addDefaultItem(itemName, itemQuantity, "");
                                                }
                                        
                                                e.target.reset();
                                            });
                                        
                                            window.toggleComplete = function (index) {
                                                defaultItems[index].completed = !defaultItems[index].completed;
                                                saveDefaultItems();
                                                renderDefaultItems();
                                            };
                                        
                                            window.deleteItem = function (index) {
                                                defaultItems.splice(index, 1);
                                                saveDefaultItems();
                                                renderDefaultItems();
                                            };
                                        
                                            // Popup to add regular items
                                            if (sessionStorage.getItem("fromRegularItems") === "true") {
                                                popup.style.display = "block";
                                                sessionStorage.removeItem("fromRegularItems");
                                            }
                                        
                                            window.addRegularItems = function () {
                                                const regularItems = JSON.parse(localStorage.getItem("regularItems")) || [];
                                                regularItems.forEach((item) => addDefaultItem(item.name, item.quantity, item.imageSrc));
                                                closePopup();
                                            };
                                        
                                            window.closePopup = function () {
                                                popup.style.display = "none";
                                            };
                                        
                                            renderDefaultItems();
                                        });
                                        