$(document).ready(function(){
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal-trigger').leanModal();
  $('.add-to-cart').click(function(e) {
    e.preventDefault()
    $this = $(this);
    console.log($this.attr('data-price'), $this.siblings('h1').html());
  })
});
