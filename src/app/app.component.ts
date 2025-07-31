import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule} from '@angular/common'; 
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';


registerLocaleData(localeEs, 'es');
@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    CommonModule, 
    RouterOutlet, 
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
})
export class AppComponent {
  title = 'Proyecto_Pintureria';

  // Variables para almacenar datos de productos
  productID = "15235";
  selectedSize = "3.6 lts";
  productPrice = 120000;
  productName = "ACRÍLICO SUPER PREMIUM 3 LTS - BLASCOR";

  productDescription = [
    {id:'15235', name: 'ACRÍLICO SUPER PREMIUM 3 LTS - BLASCOR', size:"3.6 lts", price:120000},
    {id:'15236', name: 'ACRÍLICO SUPER PREMIUM 18 LTS - BLASCOR', size:"18 lts", price:400000}
  ]


  // Funcion para capturar el cambio de tamaño y de precio
  onSelectedSize(selectedSize: string){
    this.selectedSize = selectedSize;
    const selectedSizeOption = this.productDescription.find(option => option.size === selectedSize);
    if (selectedSizeOption){
      this.productPrice = selectedSizeOption.price;
      this.productID = selectedSizeOption.id;
      this.productName = selectedSizeOption.name;
    }

  }

  selectedColor = "Blanco";
  productImage = "blascor_producto.webp";
  
    // Arreglo para opcion de colores y sus imagenes
    colorOption =[
    {color:"Blanco", imageURL:"blascor_producto.webp", bgColor:''},
    {color:"Verde Floresta", imageURL:"blascor_producto_verde.jpg", bgColor:'bg-green-700'},
    {color:"Rojo", imageURL:"blascor_producto_rojo.jpg", bgColor:'bg-red-700'}
  ]
  // Funcion para capturar cambio de opcion de color
  onColorChange(selectedColor:string){
      this.selectedColor = selectedColor;
      const selectedOption = this.colorOption.find(option => option.color === selectedColor);
      if (selectedOption){
        this.productImage = selectedOption.imageURL;
      }
  }

  
  quantity: number = 1;

  // Array para guardar items de carrito
  cart: any[] = [];
  isCartDropdownOpen: boolean = false;
  
  // Funcion para abrir el carrito de compras
  toggleCartDropdown() {
    this.isCartDropdownOpen = !this.isCartDropdownOpen;
  }

  // Funcion para añadir al carrito de compras
  addToCart(productID: string) {
    const product = this.productDescription.find(prod => prod.id === productID);

    if (product) {
      const existingItem = this.cart.find(cartItem => cartItem.id === productID);

      if (existingItem) {
        existingItem.quantity += this.quantity;
      } 
      else {
        this.cart.push({
          id: productID,
          name: product.name,
          size: this.selectedSize,
          price: this.productPrice,
          quantity: this.quantity
        });
      }
      this.quantity = 1;
    } else {
      console.error('Product not found');
    }
  }
  
  // Funcion para sacar un producto del carrito de compras
  removeFromCart(itemToRemove: any) {
    this.cart = this.cart.filter(item => item.id !== itemToRemove.id || item.size !== itemToRemove.size);
  }

  // Funcion para obtener el precio total
  getTotal() {
    return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

 // Funcion para generar el link de WhatsApp
  generateWhatsAppLink() {
    let message = `Buenas, me gustaría consultar sobre el siguiente producto:\n`;

    this.cart.forEach(item => {
        message += `Producto: ${item.name} (${item.size})\n`;
        message += `Cantidad: ${item.quantity}\n`;
        message += `Precio total: ${item.price * item.quantity} Gs\n\n`;
    })
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "595971210705";
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  }
}
