package com.astonicservice.api;


import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


import com.rest.astonicservice.jpa.Student;
import com.rest.astonicservice.jpa.test.JPAExampleTest;
import java.util.List;
 
@Path("/entry-point")
public class EntryPoint {
 
	 
	 
	
    @GET
    @Path("test")
    @Produces(MediaType.TEXT_PLAIN)
    public String test() {
    	
    	  JPAExampleTest example = new JPAExampleTest();
  	    System.out.println("After Sucessfully insertion ");
  	    Student student1 = example.saveStudent("Sumith");
  	    Student student2 = example.saveStudent("Anoop");
  	    example.listStudent();
  	    System.out.println("After Sucessfully modification ");
  	    example.updateStudent(student1.getStudentId(), "Sumith Honai");
  	    example.updateStudent(student2.getStudentId(), "Anoop Pavanai");
  	    example.listStudent();
  	    System.out.println("After Sucessfully deletion ");
  	    example.deleteStudent(student2.getStudentId());
  	    example.listStudent();
  	    
        return "Test";
    }
    
    @GET
    @Path("students")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Student> students() {
    	
    	  JPAExampleTest example = new JPAExampleTest();
  	
  	    return example.getStudents();    
       
    }
    
}
