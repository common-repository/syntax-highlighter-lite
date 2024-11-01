(function() {
 tinymce.PluginManager.add('shl_btn', function( editor, url ) {
  editor.addButton( 'cbl_btn', {
   title: 'SHL Code Editor',
   type: 'button',
   icon: 'icon dashicons-hammer',
   onclick: function() {
    editor.windowManager.open( {
     title: 'SHL Code Editor',
     body: [{
      type: 'textbox',
      multiline : true,
      name: 'code',
      label: 'Your code to be Prettyfied',
     }],
     onsubmit: function( e ) {
      editor.insertContent( '<pre class="prettyprint">' + e.data.code+ '</pre>');
     }
    });
   },
  });
 });
})();
