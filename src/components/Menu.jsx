import {useSelector} from "react-redux"

const Menu = () => {
<nav class="topBtn">
  <a href="#" class="logo">Brand</a>
  <input style="display: block; height: 30; width: 30; background: #333; position: absolute; bottom: 10px; left: 4px;" type="checkbox" id="menu-toggle" class="menu-toggle"></input>

  <label for="menu-toggle" class="hamburger">
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
  </label>
  <ul class="nav-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
}

export default Menu

