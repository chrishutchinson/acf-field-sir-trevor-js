(function($){
	
	
	function initialize_field( $el ) {

		SirTrevor.FileUploader = function() {
			console.log('wow');
		};

		// Adds a Caption Field to the Image Block
		SirTrevor.Blocks.Customimage = SirTrevor.Block.extend({

			  type: "customimage",
			  title: function() { return 'New Image'; },

			  droppable: true,
			  uploadable: true,

			  icon_name: 'image',

			  loadData: function(data){
			    // Create our image tag
			    this.$editor.html($('<img>', { src: data.file.url }));
			  },

			  onBlockRender: function(){
			    /* Setup the upload button */
			    this.$inputs.find('button').bind('click', function(ev){ ev.preventDefault(); });
			    this.$inputs.find('input').on('change', (function(ev) {
			      this.onDrop(ev.currentTarget);
			    }).bind(this));
			  },

			  onDrop: function(transferData){
			    var file = transferData.files[0],
			        urlAPI = (typeof URL !== "undefined") ? URL : (typeof webkitURL !== "undefined") ? webkitURL : null;

			    // Handle one upload at a time
			    if (/image/.test(file.type)) {
			      this.loading();
			      // Show this image on here
			      this.$inputs.hide();
			      this.$editor.html($('<img>', { src: urlAPI.createObjectURL(file) })).show();

			      this.uploader(
			        file,
			        function(data) {
			        	console.log(data);
			          this.setData(data);
			          this.ready();
			        },
			        function(error) {
			        	console.error(error);
			          this.addMessage(i18n.t('blocks:image:upload_error'));
			          this.ready();
			        }
			      );
			    }
			  }
		});
		
		new SirTrevor.Editor({
			el: $el.find('.js-st-instance'),
			blockTypes: ['Text', 'Heading', 'List', 'Customimage']
		});
		console.log(SirTrevor.FileUploader);

		SirTrevor.setDefaults({
			uploadUrl: '/wp-admin/media-new.php'
		});
		console.log(SirTrevor.FileUploader);
	}
	
	
	if( typeof acf.add_action !== 'undefined' ) {
	
		/*
		*  ready append (ACF5)
		*
		*  These are 2 events which are fired during the page load
		*  ready = on page load similar to $(document).ready()
		*  append = on new DOM elements appended via repeater field
		*
		*  @type	event
		*  @date	20/07/13
		*
		*  @param	$el (jQuery selection) the jQuery element which contains the ACF fields
		*  @return	n/a
		*/
		
		acf.add_action('ready append', function( $el ){
			
			// search $el for fields of type 'sir-trevor-js'
			acf.get_fields({ type : 'sir-trevor-js'}, $el).each(function(){
				
				initialize_field( $(this) );
				
			});
			
		});
		
		
	} else {
		
		
		/*
		*  acf/setup_fields (ACF4)
		*
		*  This event is triggered when ACF adds any new elements to the DOM. 
		*
		*  @type	function
		*  @since	1.0.0
		*  @date	01/01/12
		*
		*  @param	event		e: an event object. This can be ignored
		*  @param	Element		postbox: An element which contains the new HTML
		*
		*  @return	n/a
		*/
		
		$(document).on('acf/setup_fields', function(e, postbox){
			
			$(postbox).find('.field[data-field_type="sir-trevor-js"]').each(function(){
				
				initialize_field( $(this) );
				
			});
		
		});
	
	
	}


})(jQuery);
