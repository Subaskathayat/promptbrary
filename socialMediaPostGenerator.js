// Social Media Post Generator Module
class SocialMediaPostGenerator {
    constructor(apiKey) {
        this.API_URL = 'https://openrouter.ai/api/v1/chat/completions';
        
        // Initialize DOM elements
        this.postIdeaInput = document.getElementById('post-idea');
        this.generatePostBtn = document.getElementById('generate-post-btn');
        this.outputContent = document.getElementById('output-content');
        this.copyBtn = document.getElementById('copy-post-btn');
        this.saveBtn = document.getElementById('save-post-btn');
        this.apiKeyInput = document.getElementById('social-api-key');
        
        // Initialize chip groups
        this.platformChips = {
            container: document.querySelector('.platform-chips'),
            input: document.getElementById('platform'),
            currentValue: 'twitter' // Default value
        };
        
        this.formalityChips = {
            container: document.querySelector('.formality-chips'),
            input: document.getElementById('formality'),
            currentValue: 'auto' // Default value
        };
        
        this.toneChips = {
            container: document.querySelector('.tone-chips'),
            input: document.getElementById('tone'),
            currentValue: 'auto' // Default value
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
        this.setupChipGroup(this.formalityChips);
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

    animateChipSelection(chip) {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'chip-ripple';
        chip.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Add scale animation
        chip.style.transform = 'scale(0.95)';
        setTimeout(() => {
            chip.style.transform = '';
        }, 200);
    }

    // ... (rest of the methods remain the same)

    async generatePost() {
        const postIdea = this.postIdeaInput?.value.trim();
        const apiKey = this.apiKeyInput?.value.trim();
        
        // Validate required fields
        if (!postIdea) {
            await dialog.alert('Please enter your post idea', 'Missing Information');
            this.postIdeaInput.focus();
            return;
        }

        if (!apiKey) {
            await dialog.alert('Please enter your API key', 'API Key Required');
            this.apiKeyInput.focus();
            return;
        }

        // Show loading state
        this.isGenerating = true;
        const originalText = this.generatePostBtn.innerHTML;
        this.generatePostBtn.disabled = true;
        this.generatePostBtn.innerHTML = '<span>Generating...</span><div class="spinner"></div>';

        try {
            const platform = this.platformChips.currentValue;
            const formality = this.formalityChips.currentValue;
            const tone = this.toneChips.currentValue;
            
            const post = await this.generateSocialMediaPost(postIdea, platform, formality, tone, apiKey);
            
            // Set the generated post and make it editable
            if (this.outputContent) {
                this.outputContent.innerHTML = post.replace(/\n/g, '<br>');
                this.outputContent.contentEditable = 'true';
                this.outputContent.focus();
            }
            
            // Update button states
            this.updateButtonStates();
            
        } catch (error) {
            console.error('Error generating post:', error);
            await dialog.error(`Error: ${error.message || 'Failed to generate post'}`, 'Error');
        } finally {
            // Reset button
            this.generatePostBtn.disabled = false;
            this.generatePostBtn.innerHTML = originalText;
            this.isGenerating = false;
        }
    }

    // ... (rest of the methods remain the same)
}

// Initialize the social media post generator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const socialMediaGenerator = new SocialMediaPostGenerator();
    
    // Make it available globally if needed
    window.socialMediaGenerator = socialMediaGenerator;
});

export default SocialMediaPostGenerator;