import $ from 'jquery';

const funcs = {
	// get projects
 	getProjects (options, callback)  {
 		 $.ajax({
        		url: 'api/projects',
        		type: 'GET',
       
        		success: function (data) {
        			callback (data)
        		},
        		error: function (data) {
          			console.error('chatterbox: Failed to send message');
        		},
        		complete: function () {
         			console.log ('complete')
        		}
      		});

	}
}
export default funcs;