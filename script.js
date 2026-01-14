// Cargar y renderizar los links desde data.json
async function loadLinks() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    renderLinks(data);
  } catch (error) {
    console.error('Error al cargar los links:', error);
  }
}

// Renderizar los grupos de links
function renderLinks(groups) {
  const container = document.getElementById('linksContainer');
  
  groups.forEach(group => {
    const groupElement = createGroupElement(group);
    container.appendChild(groupElement);
  });
}

// Crear elemento de grupo
function createGroupElement(group) {
  const groupDiv = document.createElement('div');
  groupDiv.className = 'link-group';
  
  if (group.isDropdown) {
    // Crear dropdown
    const dropdownBtn = createDropdownButton(group.name);
    const dropdownContent = createDropdownContent(group.items);
    
    groupDiv.appendChild(dropdownBtn);
    groupDiv.appendChild(dropdownContent);
    
    // Event listener para toggle
    dropdownBtn.addEventListener('click', () => {
      dropdownBtn.classList.toggle('active');
      dropdownContent.classList.toggle('open');
    });
  } else {
    // Crear grupo normal con título
    const titleElement = document.createElement('div');
    titleElement.className = 'group-title';
    titleElement.textContent = group.name;
    
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'link-items';
    
    group.items.forEach(item => {
      const linkElement = createLinkElement(item);
      itemsContainer.appendChild(linkElement);
    });
    
    groupDiv.appendChild(titleElement);
    groupDiv.appendChild(itemsContainer);
  }
  
  return groupDiv;
}

// Crear botón de dropdown
function createDropdownButton(name) {
  const button = document.createElement('button');
  button.className = 'dropdown-btn';
  button.innerHTML = `
    ${name}
    <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `;
  return button;
}

// Crear contenido de dropdown
function createDropdownContent(items) {
  const content = document.createElement('div');
  content.className = 'dropdown-content';
  
  const inner = document.createElement('div');
  inner.className = 'dropdown-inner';
  
  items.forEach(item => {
    const linkElement = createLinkElement(item);
    inner.appendChild(linkElement);
  });
  
  content.appendChild(inner);
  return content;
}

// Crear elemento de link
function createLinkElement(item) {
  const link = document.createElement('a');
  link.href = item.url;
  link.className = `link-btn status-${item.status}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  
  // Texto del link
  let linkText = item.name;
  
  // Añadir badge de estado si no es finished
  if (item.status !== 'finished') {
    linkText += `<sup>${item.status}</sup>`;
  }
  
  link.innerHTML = linkText;
  
  return link;
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', loadLinks);
