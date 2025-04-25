// Share Modal functionality
(function() {
  // Use window load to ensure everything is loaded
  window.addEventListener('load', function() {
    try {
      // Safely find share buttons if they exist
      const shareButtons = document.querySelectorAll('[data-share-button]');
      
      // Only set up listeners if elements exist
      if (shareButtons && shareButtons.length > 0) {
        shareButtons.forEach(button => {
          if (button) {
            button.addEventListener('click', handleShareButtonClick);
          }
        });
      }

      // Handle share button click
      function handleShareButtonClick(e) {
        e.preventDefault();
        const shareUrl = this.getAttribute('data-url') || window.location.href;
        const shareTitle = this.getAttribute('data-title') || document.title;
        
        // Check if Web Share API is available
        if (navigator.share) {
          navigator.share({
            title: shareTitle,
            url: shareUrl
          }).catch(err => {
            console.log('Error sharing:', err);
          });
        } else {
          // Fallback: copy link to clipboard
          navigator.clipboard.writeText(shareUrl).then(() => {
            alert('تم نسخ الرابط إلى الحافظة');
          }).catch(err => {
            console.log('Error copying to clipboard:', err);
          });
        }
      }
    } catch (error) {
      // Silently handle any errors that might occur
      console.log('Share modal initialization skipped', error);
    }
  });
})(); 