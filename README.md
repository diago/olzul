# olzul

Create ol/ul lists from user input via a form.

## Scenario

Contact Form

* user fills in contact info
* user needs to add multiple methods (email, phone, etc) for the contact

olzul attaches to a form and uses a provided template to append list items to a ol/ul. Within each listed item will be the attached form fields (`type=hidden`) for submission via a main form.

## Options

### Required

template: `string` - The template to be parsed. _see the example/index.html for a sample template_

list: `jQuery` - The ol or ul item to use

### Optional

parser: `function` - Parses the template to replace variables with values

select.inputs: `string` - The selector to use to grab the form elements. Default `:input:not(:button)`

select.remove: `string` - The selector to watch for to remove a list item. Default `.remove`

### Callbacks 

callback.val: `function` - Called to grab the input value. Default returns the input value.

callback.name: `function` - Called to set the name of the hidden input element. Default returns the input name.

callback.displayVal: `function` - Called to generate the value for the template. Default returns the input value or if it is a select the innerHtml of the selected option.

callback.liAdded: `function` - Called every parsed item insert. Default resets the form and focuses the first element.

callback.valid: `function` - Called before adding the item to the list

## Wishlist

* ability to use tables as well as lists
* ability to edit an inserted item
