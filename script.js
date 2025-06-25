// script.js
class PolicyMonitor {
    constructor() {
        this.topics = [
            { id: 'obesity', name: 'Obesity' },
            { id: 'diabetes', name: 'Diabetes' },
            { id: 'healthcare', name: 'Healthcare Policy' },
            { id: 'insurance', name: 'Health Insurance' }
        ];

        this.levels = {
            federal: [
                { id: 'national', name: 'National Council' },
                { id: 'states', name: 'Council of States' }
            ],
            cantonal: [
                { id: 'zh', name: 'Zürich' },
                { id: 'be', name: 'Bern' },
                { id: 'bs', name: 'Basel' }
            ]
        };

        this.sources = [
            { id: 1, name: 'Federal Parliament', url: 'https://www.parlament.ch' },
            { id: 2, name: 'Federal Admin', url: 'https://www.admin.ch' }
        ];

        this.init();
    }

    init() {
        this.renderTopicFilters();
        this.renderLevelFilters();
        this.renderSources();
        this.loadDummyResults();
    }

    renderTopicFilters() {
        const container = document.getElementById('topicFilters');
        container.innerHTML = `
            <div class="checkbox-group">
                ${this.topics.map(topic => `
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" 
                               id="topic-${topic.id}" value="${topic.id}">
                        <label class="form-check-label" for="topic-${topic.id}">
                            ${topic.name}
                        </label>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderLevelFilters() {
        const container = document.getElementById('levelFilters');
        container.innerHTML = `
            <div class="checkbox-group">
                <h6>Federal</h6>
                ${this.levels.federal.map(item => `
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" 
                               id="federal-${item.id}" value="${item.id}">
                        <label class="form-check-label" for="federal-${item.id}">
                            ${item.name}
                        </label>
                    </div>
                `).join('')}
                
                <h6 class="mt-3">Cantonal</h6>
                ${this.levels.cantonal.map(item => `
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" 
                               id="cantonal-${item.id}" value="${item.id}">
                        <label class="form-check-label" for="cantonal-${item.id}">
                            ${item.name}
                        </label>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderSources() {
        const container = document.getElementById('sourcesList');
        container.innerHTML = this.sources.map(source => `
            <div class="source-item">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${source.name}</strong>
                        <div><small>${source.url}</small></div>
                    </div>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" checked>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadDummyResults() {
        const results = [
            {
                date: '2023-12-05',
                title: 'National Strategy for Obesity Prevention',
                source: 'Federal Parliament',
                type: 'Motion'
            },
            {
                date: '2023-12-04',
                title: 'Healthcare Cost Control Measures',
                source: 'Council of States',
                type: 'Initiative'
            }
        ];

        this.displayResults(results);
    }

    displayResults(results) {
        const container = document.getElementById('resultsArea');
        container.innerHTML = results.map(result => `
            <div class="result-item">
                <div class="d-flex justify-content-between">
                    <div>
                        <h6>${result.title}</h6>
                        <div>
                            <small class="text-muted">
                                ${result.date} | ${result.source} | ${result.type}
                            </small>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-outline-primary">
                        Save
                    </button>
                </div>
            </div>
        `).join('');
    }

    applyFilters() {
        // Get selected topics
        const selectedTopics = Array.from(document.querySelectorAll('#topicFilters input:checked'))
            .map(cb => cb.value);
        
        console.log('Selected topics:', selectedTopics);
        // In a real application, you would use these values to filter results
        this.loadDummyResults(); // For demo, just reload dummy data
    }

    exportPDF() {
        alert('Exporting PDF...');
    }

    emailPDF() {
        alert('Email PDF feature coming soon...');
    }
}

// Initialize the application
const monitor = new PolicyMonitor();