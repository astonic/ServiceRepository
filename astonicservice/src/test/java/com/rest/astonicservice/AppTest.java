package com.rest.astonicservice;

import javax.persistence.EntityManager;


import com.rest.astonicservice.jpa.Student;
import com.rest.astonicservice.jpa.test.JPAExampleTest;
import java.util.Iterator;
import java.util.List;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

/**
 * Unit test for simple App.
 */
public class AppTest 
    extends TestCase
{
    /**
     * Create the test case
     *
     * @param testName name of the test case
     */
    public AppTest( String testName )
    {
        super( testName );
    }

    /**
     * @return the suite of tests being tested
     */
    public static Test suite()
    {
        return new TestSuite( AppTest.class );
    }

    /**
     * Rigourous Test :-)
     */
    public void testApp()
    {
        assertTrue( true );
    }
        
        EntityManager entityManager ;
    public void testJPA(){
        
       
        
         entityManager = Persistence.createEntityManagerFactory("test").createEntityManager();
         
    	    Student student1 = saveStudent("Sumith");
	    Student student2 = saveStudent("Anoop");
	    listStudent();
	    System.out.println("After Sucessfully modification ");
	    updateStudent(student1.getStudentId(), "Sumith Honai");
	    updateStudent(student2.getStudentId(), "Anoop Pavanai");
	    listStudent();
	    System.out.println("After Sucessfully deletion ");
	    deleteStudent(student2.getStudentId());
	    listStudent();
	    assertTrue( true );
    }
    
    
      public Student saveStudent(String studentName) {
	    Student student = new Student();
	    try {
	      entityManager.getTransaction().begin();
	      student.setStudentName(studentName);
	      student = entityManager.merge(student);
	      entityManager.getTransaction().commit();
	    } catch (Exception e) {
	        e.printStackTrace();
                    entityManager.getTransaction().rollback();
              
	    }
	    return student;
	  }

	  public void listStudent() {
	    try {
	      entityManager.getTransaction().begin();
	      @SuppressWarnings("unchecked")
	      List<Student> Students = entityManager.createQuery("from Student").getResultList();
	      for (Iterator<Student> iterator = Students.iterator(); iterator.hasNext();) {
	        Student student = (Student) iterator.next();
	        System.out.println(student.getStudentName());
	      }
	      entityManager.getTransaction().commit();
	    } catch (Exception e) {
	      entityManager.getTransaction().rollback();
	    }
	  }
          
          
            public List<Student> getStudents() {
               	    
	    List<Student> Students = entityManager.createQuery("from Student").getResultList();
              
            return  Students; 
	  }
            

	  public void updateStudent(Long studentId, String studentName) {
	    try {
	      entityManager.getTransaction().begin();
	      Student student = (Student) entityManager.find(Student.class, studentId);
	      student.setStudentName(studentName);
	      entityManager.getTransaction().commit();
	    } catch (Exception e) {
	      entityManager.getTransaction().rollback();
	    }
	  }

	  public void deleteStudent(Long studentId) {
	    try {
	      entityManager.getTransaction().begin();
	      Student student = (Student) entityManager.find(Student.class, studentId);
	      entityManager.remove(student);
	      entityManager.getTransaction().commit();
	    } catch (Exception e) {
	      entityManager.getTransaction().rollback();
	    }
	  }
    
}
