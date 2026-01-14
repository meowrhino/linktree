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
    appendDropdown(groupDiv, group);
  } else {
    // Crear grupo normal con título
    const titleElement = document.createElement('div');
    titleElement.className = 'group-title';
    titleElement.textContent = group.name;
    
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'link-items';
    
    const items = group.items || [];
    items.forEach(item => {
      const linkElement = createLinkElement(item);
      itemsContainer.appendChild(linkElement);
    });

    const dropdowns = group.dropdowns || [];
    dropdowns.forEach(dropdown => {
      appendDropdown(itemsContainer, dropdown);
    });
    
    groupDiv.appendChild(titleElement);
    groupDiv.appendChild(itemsContainer);
  }
  
  return groupDiv;
}

// Añadir un dropdown al contenedor
function appendDropdown(container, dropdownGroup) {
  const dropdownBtn = createDropdownButton(dropdownGroup.name);
  const dropdownContent = createDropdownContent(dropdownGroup.items || []);
  
  container.appendChild(dropdownBtn);
  container.appendChild(dropdownContent);
  
  // Event listener para toggle
  dropdownBtn.addEventListener('click', () => {
    dropdownBtn.classList.toggle('active');
    dropdownContent.classList.toggle('open');
  });
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
