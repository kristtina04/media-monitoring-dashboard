// js/sources.js
class SourceManager {
    constructor() {
        this.sources = [];
        this.loadSources();
        this.setupEventListeners();
    }

    loadSources() {
        // Load default sources
        this.sources = [
            {
                id: 'parliament',
                name: 'Federal Parliament',
                url: 'https://www.parlament.ch/en/services/news',
                type: 'federal',
                active: true
            },
            {
                id: 'admin',
                name: 'Federal Administration',
                url: 'https://www.admin.ch/gov/en/start/documentation/news.html',
                type: 'federal',
                active: true
            }
            // Add more default sources
        ];

        // Load custom sources from localStorage
        const customSources = JSON.parse(localStorage.getItem('customSources')) || [];
        this.sources = [...this.sources, ...customSources];

        this.displaySources();
    }

    setupEventListeners() {
        document.getElementById('addSourceForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addSource();
        });
    }

    addSource() {
        const name = document.getElementById('sourceName').value.trim();
        const url = document.getElementById('sourceUrl').value.trim();

        const newSource = {
            id: 'custom_' + Date.now(),
            name: name,
            url: url,
            type: 'custom',
            active: true
        };

        this.sources.push(newSource);
        this.saveSources();
        this.displaySources();

        // Clear form
        document.getElementById('addSourceForm').reset();
    }

    displaySources() {
        const container = document.getElementById('sourcesList');
        container.innerHTML = this.sources.map(source => `
            <div class="source-item ${source.active ? 'active' : ''}" data-id="${source.id}">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1">${source.name}</h6>
                        <small class="text-muted">${source.url}</small>
                    </div>
                    <div class="source-actions">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" 
                                   ${source.active ? 'checked' : ''}
                                   onchange="sourceManager.toggleSource('${source.id}')">
                        </div>
                        ${source.type === 'custom' ? `
                            <button class="btn btn-sm btn-outline-danger" 
                                    onclick="sourceManager.removeSource('${source.id}')">
                                <i class="bi bi-trash"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    toggleSource(sourceId) {
        const source = this.sources.find(s => s.id === sourceId);
        if (source) {
            source.active = !source.active;
            this.saveSources();
            this.displaySources();
        }
    }

    removeSource(sourceId) {
        this.sources = this.sources.filter(s => s.id !== sourceId);
        this.saveSources();
        this.displaySources();
    }

    saveSources() {
        const customSources = this.sources.filter(s => s.type === 'custom');
        localStorage.setItem('customSources', JSON.stringify(customSources));
    }

    getActiveSources() {
        return this.sources.filter(s => s.active);
    }
}

const sourceManager = new SourceManager();