/******************************************************
Copyright (c) 2010, Heath Padrick

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*******************************************************/

(function($){

  // template parser
  function tpl(vars) {
    var $this = $(this)
      , $wrapper = $('<div />').html($this)
      , tpl = $wrapper.html();

    for(var x in vars) {
          // escape normal regexp chars
      var match = ':'+x.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
      regex = new RegExp(match, 'g'); 
      tpl = tpl.replace(regex, vars[x]); 
    }

    return tpl;
  }

  $.fn.extend({
  
    olzul: function(_options) {
      return this.each(function(){
     
        var $this = $(this)
          , options = $.extend(
              true,
              { template: false
              , list: false
              , parser: tpl
              , select: 
                { inputs: ':input:not(:button)'
                , remove: '.remove'
                }
              , callback:
                { val: function(count){ return $(this).val(); } 
                , name: function(count){ return $(this).attr('name'); } 
                , displayVal: function(count){ 
                    $this = $(this);
                    return $this.is('select')
                         ? $this.find(':selected').html()
                         : $this.val(); 
                  }
                , liAdded: function() {
                    var $this = $(this);
                    $this[0].reset();
                    $this.find(':input:first').focus();
                  }
                , valid: function(inputs){ return true; }
                }
              }, _options || {}
            )
          , count = 0;

        if( this.nodeName !== 'FORM' )
          throw( "Expected a form for olzul" );

        if( typeof options.template !== 'string' )
          throw( "Expected olzul options.template to be a string" );

        if( ! options.list instanceof $ )
          throw( "Expected olzul options.list to be an instance of jQuery" );

        $this.bind('submit', addToList);

        options.list.bind('click', function(e){
          var $this = $(this)
            , $target = $(e.target);

          if($target.is(options.select.remove)) {
            $target.closest('li').remove();
            return false;
          }

        });

        function addToList() {
          var $this = $(this)
            , $inputs = $this.find(options.select.inputs)
            , $li = $(options.template)
            , vars = {};

          if( ! options.callback.valid.call($this, $inputs)) return false;

          $inputs.each(function(){
            var $this = $(this)
              , $hidden = $('<input type="hidden" />')
                  .val(options.callback.val.call($this, count))
                  .attr('name', options.callback.name.call($this, count));

            $li.append($hidden);

            vars[$this.attr('name')] = options.callback.displayVal.call($this, count);
            
          });

          // insert parsed item into list
          options.list
            .append(options.parser.call($li, vars));
         
          // up the count
          count++;

          options.callback.liAdded.call($this);

          return false;
        }

      });

    } 

  });

})(jQuery);
