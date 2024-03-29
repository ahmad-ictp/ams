package ca.sms.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import ca.sms.models.*;
import ca.sms.services.*;

@Controller
public class AppController {
	@Autowired
	private ProfessorService professorService;
	@Autowired
	private CourseService courseService;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView home() {
		return new ModelAndView("index");
	}
	
	@RequestMapping(value = "/api/partials/{pageName}", method = RequestMethod.GET)
	public ModelAndView mainPage(@PathVariable String pageName) {
		return new ModelAndView("partials/" + pageName);
	}
	
	@RequestMapping(value = "/{pageName}", method = RequestMethod.GET)
	public ModelAndView others(@PathVariable String pageName) {
		return new ModelAndView("index");
	}
	
	@RequestMapping("/init")
	public ModelAndView forTest() {
		Professor professor = professorService.create("dssouli");
		courseService.create1(professor);
		Professor professor2 = professorService.create("greb");
		courseService.create2(professor2);
		return new ModelAndView("index");
	}
}
