package com.rest.astonicservice.jpa.test;


import java.util.Iterator;
import java.util.List;

import javax.persistence.EntityManager;


import com.rest.astonicservice.jpa.Student;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;

public class JPAExampleTest {

	

         //@PersistenceContext( unitName = "test", type = PersistenceContextType.EXTENDED)
         //private EntityManager entityManager;
    
   static EntityManager entityManager ;
    
         
	  public static void main(String[] args) {
              
              
		  JPAExampleTest example = new JPAExampleTest();
                  entityManager = Persistence.createEntityManagerFactory("test").createEntityManager();
                  
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
