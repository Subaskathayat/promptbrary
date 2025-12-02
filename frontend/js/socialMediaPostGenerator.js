// Social Media Post Generator Module
class SocialMediaPostGenerator {
    constructor() {
        // Initialize DOM elements
        this.postIdeaInput = document.getElementById('post-idea');
        this.generatePostBtn = document.getElementById('generate-post-btn');
        this.outputContent = document.getElementById('output-content');
        this.copyBtn = document.getElementById('copy-post-btn');
        this.saveBtn = document.getElementById('save-post-btn');
        
        // Initialize chip groups
        this.platformChips = {
            container: document.querySelector('.platform-chips'),
            input: document.getElementById('platform'),
            currentValue: 'twitter' // Default value
        };
        
        this.styleChips = {
            container: document.querySelector('.style-chips'),
            input: document.getElementById('style'),
            currentValue: 'informative' // Default value
        };
        
        this.toneChips = {
            container: document.querySelector('.tone-chips'),
            input: document.getElementById('tone'),
            currentValue: 'friendly' // Default value
        };
        
        // Initialize state flags
        this.isGenerating = false;
        this.isCopying = false;
        this.isSaving = false;
        
        // Initialize event listeners
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Platform chips
        this.setupChipGroup(this.platformChips);
        this.setupChipGroup(this.styleChips);
        this.setupChipGroup(this.toneChips);
        
        // Handle generate post button click
        if (this.generatePostBtn) {
            this.generatePostBtn.addEventListener('click', () => this.generatePost());
        }
        
        // Handle copy button click
        if (this.copyBtn) {
            this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        }
        
        // Handle save button click
        if (this.saveBtn) {
            this.saveBtn.addEventListener('click', () => this.savePost());
        }
        
        // Handle Enter key in post idea input
        if (this.postIdeaInput) {
            this.postIdeaInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                    e.preventDefault();
                    this.generatePost();
                }
            });
        }
    }

    setupChipGroup(chipGroup) {
        if (!chipGroup.container) return;
        
        // Set initial active state
        const initialChip = chipGroup.container.querySelector(`[data-value="${chipGroup.input.value}"]`);
        if (initialChip) {
            initialChip.classList.add('active');
            chipGroup.currentValue = chipGroup.input.value;
        }
        
        // Add click handlers to all chips
        const chips = chipGroup.container.querySelectorAll('.chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                const value = chip.dataset.value;
                if (value === chipGroup.currentValue) return;
                
                // Update active state with animation
                chipGroup.container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                
                // Update current value and input
                chipGroup.currentValue = value;
                chipGroup.input.value = value;
            });
        });
    }

    async generatePost() {
        const topic = this.postIdeaInput.value.trim();
        const platform = this.platformChips.currentValue;
        const style = this.styleChips.currentValue;
        const tone = this.toneChips.currentValue;
        
        if (!topic) {
            await dialog.alert('Please enter a topic or idea for your post', 'Missing Topic');
            return;
        }
        
        // Show loading state
        this.isGenerating = true;
        const originalText = this.generatePostBtn.innerHTML;
        this.generatePostBtn.disabled = true;
        this.generatePostBtn.innerHTML = '<span>Generating...</span><div class="spinner"></div>';
        
        try {
            // Clear previous output
            this.outputContent.innerHTML = '';
            this.outputContent.contentEditable = 'false';
            
            // Call our backend API
            const response = await fetch('/api/generate-social-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    platform,
                    topic,
                    style,
                    tone
                })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate post');
            }
            
            // Display the generated post
            this.outputContent.innerHTML = data.post.replace(/\n/g, '<br>');
            this.outputContent.contentEditable = 'true';
            this.outputContent.focus();
            
            // Update UI
            this.updateButtonStates();
            
        } catch (error) {
            console.error('Error generating post:', error);
            await dialog.error(`Error: ${error.message || 'Failed to generate post'}`, 'Error');
        } finally {
            // Reset button
            this.isGenerating = false;
            this.generatePostBtn.disabled = false;
            this.generatePostBtn.innerHTML = originalText;
        }
    }

    showError(message) {
        this.outputContent.textContent = message;
        this.outputContent.classList.add('error');
    }

    updateButtonStates() {
        // Update generate button
        if (this.generatePostBtn) {
            this.generatePostBtn.disabled = this.isGenerating;
            this.generatePostBtn.textContent = this.isGenerating ? 'Generating...' : 'Generate Post';
        }
        
        // Update copy button
        if (this.copyBtn) {
            this.copyBtn.disabled = this.isGenerating || !this.outputContent.textContent.trim();
        }
        
        // Update save button
        if (this.saveBtn) {
            this.saveBtn.disabled = this.isGenerating || !this.outputContent.textContent.trim();
        }
    }

    copyToClipboard() {
        if (this.isCopying || !this.outputContent.textContent.trim()) return;
        
        this.isCopying = true;
        navigator.clipboard.writeText(this.outputContent.textContent)
            .then(() => {
                const originalText = this.copyBtn.textContent;
                this.copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    this.copyBtn.textContent = originalText;
                    this.isCopying = false;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                this.isCopying = false;
            });
    }

    savePost() {
        if (this.isSaving || !this.outputContent.textContent.trim()) return;
        
        // In a real app, you would save this to a database or local storage
        // For now, we'll just show a message
        this.isSaving = true;
        const originalText = this.saveBtn.textContent;
        this.saveBtn.textContent = 'Saved!';
        setTimeout(() => {
            this.saveBtn.textContent = originalText;
            this.isSaving = false;
        }, 2000);
    }
}

// Initialize the social media post generator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the social media post generator page
    if (document.getElementById('generate-post-btn')) {
        // Initialize the social media post generator
        const socialMediaGenerator = new SocialMediaPostGenerator();
    }
});